"use client";

import { useEffect, useMemo, useState } from "react";

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

type RoastResponse = {
  overallScore: number;
  factors: RoastFactor[];
  quickWins: string[];
  pageTitle?: string;
  rateLimit?: {
    remaining: number;
    limit: number;
  };
};

const loadingMessages = [
  "Judging your headline...",
  "Checking your CTA...",
  "Looking for social proof...",
  "Scanning for trust signals...",
  "Asking if this page actually converts...",
  "Trying not to be too mean...",
];

const factorOrder: { key: FactorKey; label: string }[] = [
  { key: "headlineClarity", label: "Headline Clarity" },
  { key: "supportingCopy", label: "Supporting Copy" },
  { key: "socialProof", label: "Social Proof" },
  { key: "callToAction", label: "Call-to-Action" },
  { key: "visualHierarchy", label: "Visual Hierarchy" },
  { key: "trustSignals", label: "Trust Signals" },
  { key: "speedAndMobile", label: "Speed & Mobile" },
  { key: "offerClarity", label: "Offer Clarity" },
];

function scoreStyles(score: number) {
  if (score <= 3) {
    return "border-red-500/30 bg-red-500/10 text-red-300";
  }

  if (score <= 6) {
    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
}

export default function RoastMyLandingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const interval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [loading]);

  const shareUrl = useMemo(() => {
    if (!result) return "";

    const text = `My landing page just got roasted: ${result.overallScore}/80 🔥 Check yours →`;
    const appUrl = typeof window !== "undefined" ? `${window.location.origin}/tools/roast-my-lp` : "/tools/roast-my-lp";
    return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(appUrl)}`;
  }, [result]);

  const orderedFactors = useMemo(() => {
    if (!result) return [];

    const map = new Map(result.factors.map((factor) => [factor.key, factor]));
    return factorOrder
      .map(({ key, label }) => {
        const factor = map.get(key);
        return factor
          ? factor
          : {
              key,
              label,
              score: 0,
              roast: "No feedback returned.",
              fix: "Try again.",
            };
      })
      .slice(0, 8);
  }, [result]);

  async function handleRoast() {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Drop in a URL first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setMessageIndex(0);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = (await response.json()) as RoastResponse & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "The roast machine broke. Try again.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="text-sm text-gray-400 transition hover:text-white">
            ← Back to Cody Labs
          </a>
          <div className="mt-6 max-w-3xl">
            <div className="mb-3 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              Brutal CRO Audit
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Roast My Landing Page 🔥</h1>
            <p className="mt-4 text-lg leading-8 text-gray-400">
              Paste your landing page URL and get a savage-but-useful conversion audit across the 8 things that actually move signups.
            </p>
          </div>
        </div>
      </header>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <label htmlFor="lp-url" className="mb-3 block text-sm font-medium text-gray-300">
                  Landing page URL
                </label>
                <input
                  id="lp-url"
                  type="url"
                  inputMode="url"
                  placeholder="https://your-site.com/landing-page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#111111] px-5 py-4 text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
                />
              </div>
              <button
                onClick={handleRoast}
                disabled={loading}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-500/50 disabled:text-black/60"
              >
                {loading ? "Roasting..." : "Roast My Page 🔥"}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>Free: 3 roasts per IP per day.</span>
              {result?.rateLimit ? (
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-gray-300">
                  {result.rateLimit.remaining}/{result.rateLimit.limit} left today
                </span>
              ) : null}
            </div>

            {loading ? (
              <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5 text-orange-200">
                <div className="text-sm uppercase tracking-[0.2em] text-orange-300/80">AI is judging</div>
                <div className="mt-2 text-xl font-semibold">{loadingMessages[messageIndex]}</div>
              </div>
            ) : null}

            {error ? (
              <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-200">
                {error}
              </div>
            ) : null}
          </div>

          {result ? (
            <div className="mt-10 space-y-8">
              <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Overall Score</div>
                  <div className="mt-3 text-6xl font-bold text-white">{result.overallScore}<span className="text-2xl text-gray-500">/80</span></div>
                  <p className="mt-4 text-sm text-gray-400">
                    {result.pageTitle ? `Page analyzed: ${result.pageTitle}` : "Your funnel got evaluated across 8 conversion factors."}
                  </p>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-[#111111] px-4 py-3 font-medium text-white transition hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    Share on X
                  </a>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {orderedFactors.map((factor) => (
                    <article
                      key={factor.key}
                      className={`rounded-3xl border p-5 ${scoreStyles(factor.score)}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-lg font-semibold text-white">{factor.label}</h2>
                        <div className="rounded-full border border-current/20 px-3 py-1 text-sm font-semibold">
                          {factor.score}/10
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-gray-100/90">{factor.roast}</p>
                      <div className="mt-4 rounded-2xl bg-black/20 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-300">
                          Specific fix
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/90">{factor.fix}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Top 3 Quick Wins</div>
                    <h2 className="mt-2 text-2xl font-bold text-white">What to fix first</h2>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {result.quickWins.slice(0, 3).map((win, index) => (
                    <div key={`${win}-${index}`} className="rounded-2xl border border-white/10 bg-[#111111] p-5">
                      <div className="text-sm font-semibold text-orange-300">Quick Win #{index + 1}</div>
                      <p className="mt-3 text-sm leading-7 text-gray-300">{win}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        Built by Cody Labs — an AI CEO running a real business
      </footer>
    </main>
  );
}
