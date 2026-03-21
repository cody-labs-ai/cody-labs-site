"use client";

import Head from "next/head";
import { useMemo, useState } from "react";

type Tone = "Professional" | "Casual" | "Creative" | "Bold" | "Minimalist";

type BioInput = {
  role: string;
  industry: string;
  keywords: string;
  tone: Tone;
};

const tones: Tone[] = ["Professional", "Casual", "Creative", "Bold", "Minimalist"];

const toneOpeners: Record<Tone, string[]> = {
  Professional: ["Helping", "Building", "Focused on", "Working at the intersection of"],
  Casual: ["Making", "Sharing", "Exploring", "Figuring out"],
  Creative: ["Crafting", "Dreaming up", "Turning ideas into", "Designing"],
  Bold: ["Redefining", "Breaking rules in", "Leading", "Building the future of"],
  Minimalist: ["Building", "Creating", "Exploring", "Shipping"],
};

const toneClosers: Record<Tone, string[]> = {
  Professional: ["Open to meaningful connections.", "Insights on growth, product, and execution.", "Sharing lessons from the field."],
  Casual: ["Sharing what works.", "Learning in public.", "Here for good ideas and sharp conversations."],
  Creative: ["Ideas, experiments, and a little chaos.", "Where strategy meets taste.", "Creating things people actually remember."],
  Bold: ["No fluff. Just results.", "Built for people who move fast.", "Turning ambition into momentum."],
  Minimalist: ["Simple ideas. Real impact.", "Thoughts on building better.", "Less noise. More signal."],
};

const emojiByTone: Record<Tone, string[]> = {
  Professional: ["", "", ""],
  Casual: ["☕", "🚀", "✨"],
  Creative: ["✦", "⚡", "🎨"],
  Bold: ["⚔️", "🔥", "🚀"],
  Minimalist: ["", "", ""],
};

function pick<T>(items: T[], seed: number) {
  return items[seed % items.length];
}

function cleanKeywords(input: string) {
  return input
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function fitToLimit(text: string, limit = 160) {
  if (text.length <= limit) return text;
  const shortened = text.slice(0, limit - 1).trim();
  return `${shortened}…`;
}

function buildBios({ role, industry, keywords, tone }: BioInput) {
  const cleanRole = role.trim() || "Builder";
  const cleanIndustry = industry.trim() || "digital products";
  const keywordList = cleanKeywords(keywords);
  const primary = keywordList[0] || "growth";
  const secondary = keywordList[1] || "strategy";
  const tertiary = keywordList[2] || "content";

  const seeds = [0, 1, 2, 3, 4];

  return seeds.map((seed) => {
    const opener = pick(toneOpeners[tone], seed);
    const closer = pick(toneClosers[tone], seed + 1);
    const emoji = pick(emojiByTone[tone], seed + 2);

    const prefix = emoji ? `${emoji} ` : "";

    const templates = [
      `${prefix}${cleanRole} in ${cleanIndustry}. ${opener.toLowerCase()} ${primary}, ${secondary} & smart execution. ${closer}`,
      `${prefix}${cleanRole} helping brands grow in ${cleanIndustry} through ${primary}, ${secondary}, and ${tertiary}.`,
      `${prefix}${opener} better ${cleanIndustry} systems as a ${cleanRole}. ${primary} | ${secondary} | ${tertiary}.`,
      `${prefix}${cleanRole} • ${cleanIndustry} • ${primary}, ${secondary}, ${tertiary}. ${closer}`,
      `${prefix}${opener} ideas into traction in ${cleanIndustry}. ${cleanRole}. ${primary}-driven, ${secondary}-minded.`,
    ];

    return fitToLimit(templates[seed]);
  });
}

export default function BioGeneratorPage() {
  const [form, setForm] = useState<BioInput>({
    role: "",
    industry: "",
    keywords: "",
    tone: "Professional",
  });
  const [bios, setBios] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const canGenerate = useMemo(() => {
    return form.role.trim() && form.industry.trim() && form.keywords.trim();
  }, [form]);

  const handleGenerate = () => {
    if (!canGenerate) return;
    setBios(buildBios(form));
    setCopiedIndex(null);
  };

  const handleCopy = async (bio: string, index: number) => {
    await navigator.clipboard.writeText(bio);
    setCopiedIndex(index);
    window.setTimeout(() => {
      setCopiedIndex((current) => (current === index ? null : current));
    }, 1800);
  };

  return (
    <>
      <Head>
        <title>X/Twitter Bio Generator | Cody Labs</title>
        <meta
          name="description"
          content="Generate 5 X/Twitter bio ideas instantly based on your role, industry, keywords, and tone. Free client-side bio generator by Cody Labs."
        />
      </Head>

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="border-b border-gray-800 px-6 py-6">
          <div className="mx-auto max-w-5xl">
            <a href="/tools" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to tools
            </a>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">X/Twitter Bio Generator</h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              Create 5 sharp bio options for X in seconds. Pick your tone, add your niche,
              and copy the one that fits your brand.
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold">Build your bio</h2>
            <p className="mt-2 text-sm text-gray-400">
              Keep it specific. Strong inputs make stronger bios.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Role / Job title
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((current) => ({ ...current, role: e.target.value }))}
                  placeholder="e.g. Growth marketer, SaaS founder, Product designer"
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Industry</label>
                <input
                  type="text"
                  value={form.industry}
                  onChange={(e) => setForm((current) => ({ ...current, industry: e.target.value }))}
                  placeholder="e.g. SaaS, e-commerce, creator economy"
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={(e) => setForm((current) => ({ ...current, keywords: e.target.value }))}
                  placeholder="e.g. AI, growth, content, startups"
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Tone</label>
                <select
                  value={form.tone}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, tone: e.target.value as Tone }))
                  }
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>
                      {tone}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`w-full rounded-xl px-6 py-4 font-semibold transition ${
                  canGenerate
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "cursor-not-allowed bg-gray-800 text-gray-500"
                }`}
              >
                Generate 5 bios
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Your bio options</h2>
                <p className="mt-2 text-sm text-gray-400">Each option is capped at 160 characters.</p>
              </div>
              <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                Free tool
              </div>
            </div>

            {bios.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-gray-800 bg-gray-950/70 p-8 text-center text-gray-500">
                Fill out the form and generate your first set of bios.
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                {bios.map((bio, index) => (
                  <div
                    key={`${bio}-${index}`}
                    className="rounded-2xl border border-gray-800 bg-gray-950/70 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                          Option {index + 1}
                        </div>
                        <p className="text-sm leading-7 text-gray-200">{bio}</p>
                        <p className="mt-3 text-xs text-gray-500">{bio.length}/160 characters</p>
                      </div>
                      <button
                        onClick={() => handleCopy(bio, index)}
                        className="shrink-0 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-500 hover:text-blue-300"
                      >
                        {copiedIndex === index ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-blue-500/10 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-bold">What makes a strong X bio?</h2>
            <div className="mt-4 grid gap-4 text-sm text-gray-300 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
                <p className="font-semibold text-white">Clarity</p>
                <p className="mt-2 text-gray-400">Say what you do and who you help without sounding generic.</p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
                <p className="font-semibold text-white">Specificity</p>
                <p className="mt-2 text-gray-400">Use niche keywords people actually associate with your work.</p>
              </div>
              <div className="rounded-xl border border-gray-800 bg-black/30 p-4">
                <p className="font-semibold text-white">Tone fit</p>
                <p className="mt-2 text-gray-400">Your bio should feel like your brand before anyone reads a post.</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
          <p>
            Built by{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Cody Labs
            </a>{" "}
            · An AI-run business with zero employees
          </p>
        </footer>
      </main>
    </>
  );
}
