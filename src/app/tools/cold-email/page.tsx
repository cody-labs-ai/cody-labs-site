"use client";

import { useMemo, useState } from "react";

type Industry = "SaaS" | "Agency" | "Freelance" | "E-commerce" | "Consulting" | "Real Estate" | "Other";
type Tone = "Professional" | "Casual" | "Provocative" | "Curious" | "Direct";

type FormState = {
  industry: Industry;
  targetRole: string;
  offering: string;
  tone: Tone;
};

const industries: Industry[] = ["SaaS", "Agency", "Freelance", "E-commerce", "Consulting", "Real Estate", "Other"];
const tones: Tone[] = ["Professional", "Casual", "Provocative", "Curious", "Direct"];

const toneSettings: Record<Tone, {
  hookLead: string;
  cta: string;
  signOff: string;
  valueVerb: string;
  urgencyLead: string;
}> = {
  Professional: {
    hookLead: "I noticed",
    cta: "Would you be open to a quick 15-minute chat next week?",
    signOff: "Best",
    valueVerb: "help",
    urgencyLead: "Worth a quick look",
  },
  Casual: {
    hookLead: "Saw that",
    cta: "Open to a quick chat sometime this week?",
    signOff: "Cheers",
    valueVerb: "help",
    urgencyLead: "Quick one",
  },
  Provocative: {
    hookLead: "Most teams I see are",
    cta: "Want me to show you exactly where the upside is?",
    signOff: "—",
    valueVerb: "unlock",
    urgencyLead: "Before this quarter slips",
  },
  Curious: {
    hookLead: "I’m curious whether",
    cta: "Would it be worth exploring for 15 minutes?",
    signOff: "Curious to hear",
    valueVerb: "improve",
    urgencyLead: "A thought for your team",
  },
  Direct: {
    hookLead: "You likely need",
    cta: "Can we book 15 minutes to see if there’s a fit?",
    signOff: "Thanks",
    valueVerb: "get",
    urgencyLead: "Straight to it",
  },
};

const industryPainPoints: Record<Industry, string> = {
  SaaS: "pipeline growth without bloated CAC",
  Agency: "more qualified leads without relying on referrals",
  Freelance: "landing better clients consistently",
  "E-commerce": "increasing repeat purchases and conversion rate",
  Consulting: "turning expertise into predictable client acquisition",
  "Real Estate": "generating more seller and buyer conversations",
  Other: "creating more demand without adding more headcount",
};

const industryHooks: Record<Industry, string> = {
  SaaS: "growing demo volume while keeping acquisition efficient",
  Agency: "keeping new business flowing without feast-or-famine months",
  Freelance: "winning stronger-fit projects instead of chasing leads",
  "E-commerce": "lifting store revenue without simply buying more traffic",
  Consulting: "turning authority into a steady stream of conversations",
  "Real Estate": "staying top-of-mind in a crowded local market",
  Other: "creating a repeatable path to more revenue",
};

function titleCaseRole(role: string) {
  const trimmed = role.trim();
  return trimmed || "decision-maker";
}

function normalizeOffering(offering: string) {
  const trimmed = offering.trim();
  return trimmed || "your offer";
}

function buildSubjectLines(form: FormState) {
  const role = titleCaseRole(form.targetRole);
  const offering = normalizeOffering(form.offering);
  const pain = industryPainPoints[form.industry];
  const urgency = toneSettings[form.tone].urgencyLead;

  return [
    `Quick question, ${role}?`,
    `3 ideas to improve ${pain}`,
    `Still handling ${pain} the hard way?`,
    `An idea for your ${role} team`,
    `${offering} for ${form.industry} teams`,
    `Worth a look before Q${new Date().getMonth() < 3 ? 2 : new Date().getMonth() < 6 ? 3 : new Date().getMonth() < 9 ? 4 : 1}?`,
    `How top ${form.industry.toLowerCase()} brands approach ${pain}`,
    `This might be relevant to your ${role} goals`,
    `${urgency}: ${offering}`,
    `Could ${offering} help with ${pain}?`,
  ];
}

function buildEmailTemplate(form: FormState) {
  const role = titleCaseRole(form.targetRole);
  const offering = normalizeOffering(form.offering);
  const tone = toneSettings[form.tone];
  const hook = industryHooks[form.industry];
  const pain = industryPainPoints[form.industry];

  return `Hi {{FirstName}},\n\n${tone.hookLead} ${role.toLowerCase()}s in ${form.industry.toLowerCase()} are focused on ${hook}.\n\nI’m reaching out because we help teams like yours ${tone.valueVerb} with ${pain} through ${offering}.\n\nThe reason this tends to work: it helps you move faster, reduce wasted effort, and create a clearer path to results without adding a lot of extra complexity.\n\n${tone.cta}\n\n${tone.signOff},\n{{YourName}}`;
}

function useShareUrl(subjectLines: string[], form: FormState) {
  return useMemo(() => {
    const appUrl = typeof window !== "undefined" ? `${window.location.origin}/tools/cold-email` : "/tools/cold-email";
    const text = `I generated cold email subject lines for ${form.industry} outreach with Cody Labs →`;
    return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(appUrl)}`;
  }, [form.industry, subjectLines]);
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export default function ColdEmailPage() {
  const [form, setForm] = useState<FormState>({
    industry: "SaaS",
    targetRole: "CEO",
    offering: "done-for-you outbound lead generation",
    tone: "Professional",
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const subjectLines = useMemo(() => buildSubjectLines(form), [form]);
  const emailTemplate = useMemo(() => buildEmailTemplate(form), [form]);
  const shareHref = useShareUrl(subjectLines, form);

  async function handleCopySubject(index: number, value: string) {
    try {
      await copyToClipboard(value);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1800);
    } catch {
      setCopiedIndex(null);
    }
  }

  async function handleCopyEmail() {
    try {
      await copyToClipboard(emailTemplate);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
          <div>
            <a href="/tools" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to tools
            </a>
            <div className="mt-5 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Outbound growth tool
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Cold Email Subject Line Generator</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-400">
              Generate clickable cold email subject lines and a full outreach draft for your niche, offer, and buyer.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Dial in the inputs</h2>
              <p className="mt-2 text-sm text-gray-400">
                Simple template logic. No API calls. Just proven cold-email angles remixed for your market.
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-right text-xs text-gray-400">
              <div>Output</div>
              <div className="text-lg font-bold text-emerald-300">10 subject lines</div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Your industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm((current) => ({ ...current, industry: e.target.value as Industry }))}
                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Target role</label>
              <input
                type="text"
                value={form.targetRole}
                onChange={(e) => setForm((current) => ({ ...current, targetRole: e.target.value }))}
                placeholder="CEO"
                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">What you&apos;re offering</label>
              <input
                type="text"
                value={form.offering}
                onChange={(e) => setForm((current) => ({ ...current, offering: e.target.value }))}
                placeholder="done-for-you outbound lead generation"
                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Tone</label>
              <select
                value={form.tone}
                onChange={(e) => setForm((current) => ({ ...current, tone: e.target.value as Tone }))}
                className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
              >
                {tones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Generated angles</p>
                <h2 className="mt-2 text-3xl font-bold">Subject lines that feel human</h2>
              </div>
              <a
                href={shareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 font-semibold text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/15"
              >
                Share on X
              </a>
            </div>

            <div className="mt-6 grid gap-3">
              {subjectLines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-800 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Subject line #{index + 1}</div>
                    <p className="mt-1 text-lg font-medium text-white">{line}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopySubject(index, line)}
                    className="inline-flex min-w-24 items-center justify-center rounded-xl border border-gray-700 bg-gray-950 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
                  >
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Full cold email template</div>
                <h2 className="mt-2 text-2xl font-bold">Plug in names and send</h2>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center rounded-2xl border border-gray-700 bg-gray-950 px-5 py-3 font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
              >
                {copiedEmail ? "Copied email" : "Copy email"}
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-800 bg-black/30 p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">{emailTemplate}</pre>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
          <h2 className="text-2xl font-bold">How this generator thinks</h2>
          <div className="mt-5 grid gap-3 text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Question hooks to trigger replies</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Number-based lines to feel specific</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Pain-point framing for urgency</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Curiosity-gap phrasing to win opens</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Name-drop style authority angles</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4">Urgency without sounding spammy</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        Built by Cody Labs — an AI CEO running a real business
      </footer>
    </main>
  );
}
