import { NextRequest, NextResponse } from "next/server";

type FactorKey =
  | "headlineClarity"
  | "supportingCopy"
  | "socialProof"
  | "callToAction"
  | "visualHierarchy"
  | "trustSignals"
  | "speedAndMobile"
  | "offerClarity";

type RoastFactor = {
  key: FactorKey;
  label: string;
  score: number;
  roast: string;
  fix: string;
};

type RoastPayload = {
  overallScore: number;
  pageTitle?: string;
  quickWins: string[];
  factors: RoastFactor[];
};

type RateLimitEntry = {
  count: number;
  day: string;
};

const DAILY_LIMIT = 3;
const FACTORS: { key: FactorKey; label: string }[] = [
  { key: "headlineClarity", label: "Headline Clarity" },
  { key: "supportingCopy", label: "Supporting Copy" },
  { key: "socialProof", label: "Social Proof" },
  { key: "callToAction", label: "Call-to-Action" },
  { key: "visualHierarchy", label: "Visual Hierarchy" },
  { key: "trustSignals", label: "Trust Signals" },
  { key: "speedAndMobile", label: "Speed & Mobile" },
  { key: "offerClarity", label: "Offer Clarity" },
];

const rateLimitStore = globalThis as typeof globalThis & {
  __roastRateLimit?: Map<string, RateLimitEntry>;
};

if (!rateLimitStore.__roastRateLimit) {
  rateLimitStore.__roastRateLimit = new Map<string, RateLimitEntry>();
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return titleMatch?.[1]?.replace(/\s+/g, " ").trim();
}

function buildPrompt({ url, title, text }: { url: string; title?: string; text: string }) {
  return `You are a brutally honest but useful CRO auditor.

Analyze this landing page content and return ONLY valid JSON.

Rules:
- Score each factor from 0 to 10.
- Use sharp, witty, concise feedback. One sentence per roast.
- Each fix must be one specific action, not generic advice.
- Base the audit only on the provided content. If evidence is missing, score accordingly.
- overallScore must equal the sum of the 8 factor scores.
- quickWins must contain exactly 3 items.
- factors must contain exactly these 8 factors in any order:
  1. headlineClarity / Headline Clarity
  2. supportingCopy / Supporting Copy
  3. socialProof / Social Proof
  4. callToAction / Call-to-Action
  5. visualHierarchy / Visual Hierarchy
  6. trustSignals / Trust Signals
  7. speedAndMobile / Speed & Mobile
  8. offerClarity / Offer Clarity

Return this exact JSON shape:
{
  "pageTitle": "string",
  "overallScore": 0,
  "quickWins": ["string", "string", "string"],
  "factors": [
    {
      "key": "headlineClarity",
      "label": "Headline Clarity",
      "score": 0,
      "roast": "string",
      "fix": "string"
    }
  ]
}

URL: ${url}
PAGE TITLE: ${title ?? "Unknown"}
PAGE TEXT:
"""
${text}
"""`;
}

function normalizePayload(payload: RoastPayload): RoastPayload {
  const factorMap = new Map(payload.factors.map((factor) => [factor.key, factor]));

  const factors = FACTORS.map(({ key, label }) => {
    const factor = factorMap.get(key);
    return {
      key,
      label,
      score: Math.max(0, Math.min(10, Number(factor?.score ?? 0))),
      roast: factor?.roast?.trim() || "This part of the page is doing absolutely no heavy lifting.",
      fix: factor?.fix?.trim() || "Add a clearer, more specific conversion-focused improvement here.",
    } satisfies RoastFactor;
  });

  const overallScore = factors.reduce((sum, factor) => sum + factor.score, 0);

  return {
    pageTitle: payload.pageTitle?.trim() || undefined,
    overallScore,
    quickWins: payload.quickWins.slice(0, 3),
    factors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const today = getTodayKey();
    const rateLimitKey = `${ip}:${today}`;
    const existing = rateLimitStore.__roastRateLimit?.get(rateLimitKey) ?? { count: 0, day: today };

    if (existing.day !== today) {
      existing.count = 0;
      existing.day = today;
    }

    if (existing.count >= DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: "You used all 3 free roasts for today. Come back tomorrow with thicker skin.",
        },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { url?: string };
    const inputUrl = body.url?.trim();

    if (!inputUrl) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(inputUrl);
    } catch {
      return NextResponse.json({ error: "Please enter a valid URL." }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: "Only http and https URLs are supported." }, { status: 400 });
    }

    const pageResponse = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; CodyLabsRoastBot/1.0; +https://codylabs.ai)",
      },
      redirect: "follow",
      cache: "no-store",
    });

    if (!pageResponse.ok) {
      return NextResponse.json(
        { error: `Couldn't fetch that page (${pageResponse.status}).` },
        { status: 400 },
      );
    }

    const html = await pageResponse.text();
    const pageTitle = extractTitle(html);
    const pageText = stripHtml(html).slice(0, 18000);

    if (!pageText) {
      return NextResponse.json({ error: "That page had no readable content to roast." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured." }, { status: 500 });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: buildPrompt({
                    url: parsedUrl.toString(),
                    title: pageTitle,
                    text: pageText,
                  }),
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        }),
        cache: "no-store",
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return NextResponse.json(
        { error: `Gemini request failed: ${errorText}` },
        { status: 500 },
      );
    }

    const geminiJson = (await geminiResponse.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{
            text?: string;
          }>;
        };
      }>;
    };

    const rawText = geminiJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json({ error: "Gemini returned an empty roast." }, { status: 500 });
    }

    const parsed = JSON.parse(rawText) as RoastPayload;
    const normalized = normalizePayload(parsed);

    if (normalized.quickWins.length < 3) {
      normalized.quickWins = [
        ...normalized.quickWins,
        "Rewrite your headline so a stranger understands the value in five seconds.",
        "Make the primary CTA painfully obvious and repeat it higher on the page.",
        "Add proof that real humans trust this offer.",
      ].slice(0, 3);
    }

    existing.count += 1;
    rateLimitStore.__roastRateLimit?.set(rateLimitKey, existing);

    return NextResponse.json({
      ...normalized,
      pageTitle: normalized.pageTitle ?? pageTitle,
      rateLimit: {
        remaining: Math.max(0, DAILY_LIMIT - existing.count),
        limit: DAILY_LIMIT,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
