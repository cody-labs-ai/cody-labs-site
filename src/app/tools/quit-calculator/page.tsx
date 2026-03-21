"use client";

import { useMemo, useState } from "react";

type Traction = "none" | "interest" | "customers" | "growing";
type Dependents = 0 | 1 | 2 | 3;

type FormState = {
  monthlySavings: number;
  monthlyExpenses: number;
  sideIncome: number;
  jobSatisfaction: number;
  traction: Traction;
  dependents: Dependents;
  emergencyFundTarget: number;
};

type Result = {
  runwayMonths: number;
  monthlyGap: number;
  riskScore: number;
  verdict: string;
  advice: string[];
};

const tractionOptions: { value: Traction; label: string; emoji: string; score: number }[] = [
  { value: "none", label: "None", emoji: "🌫️", score: 0 },
  { value: "interest", label: "Some interest", emoji: "👀", score: 10 },
  { value: "customers", label: "Paying customers", emoji: "💸", score: 20 },
  { value: "growing", label: "Growing revenue", emoji: "📈", score: 30 },
];

const dependentPenalty: Record<Dependents, number> = {
  0: 12,
  1: 8,
  2: 4,
  3: 0,
};

const dependentLabels: Record<Dependents, string> = {
  0: "0",
  1: "1",
  2: "2",
  3: "3+",
};

const defaultForm: FormState = {
  monthlySavings: 12000,
  monthlyExpenses: 3500,
  sideIncome: 800,
  jobSatisfaction: 4,
  traction: "interest",
  dependents: 0,
  emergencyFundTarget: 6,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatMonths(value: number) {
  if (!Number.isFinite(value)) return "∞";
  if (value >= 100) return `${value.toFixed(0)}+`;
  return value.toFixed(value < 10 ? 1 : 0);
}

function getVerdict(score: number) {
  if (score >= 80) return "🟢 You're ready. Jump.";
  if (score >= 60) return "🟡 Almost there. Build more runway.";
  if (score >= 35) return "🔴 Not yet. Keep grinding.";
  return "💀 Don't even think about it.";
}

function buildAdvice({ runwayMonths, monthlyGap, riskScore, form }: { runwayMonths: number; monthlyGap: number; riskScore: number; form: FormState }) {
  const advice: string[] = [];
  const targetGapBuffer = form.monthlyExpenses * form.emergencyFundTarget;

  if (monthlyGap <= 0) {
    advice.push("Your side income already covers your monthly burn. That's a huge signal — test a soft exit before a dramatic one.");
  } else if (runwayMonths < form.emergencyFundTarget) {
    advice.push(
      `You only have ${formatMonths(runwayMonths)} months of runway against a ${form.emergencyFundTarget}-month target. Stack more cash or cut burn before making the leap.`
    );
  } else {
    advice.push("Your runway clears your emergency target. The next unlock is proving income stability, not just courage.");
  }

  if (form.traction === "none") {
    advice.push("Your side project has zero traction right now. Don't quit for vibes — quit for signal.");
  } else if (form.traction === "interest") {
    advice.push("People are interested, but interest is not revenue. Push toward repeatable sales before resigning.");
  } else if (form.traction === "customers") {
    advice.push("Paying customers are real proof. Focus on making that revenue less lumpy and more predictable.");
  } else {
    advice.push("Growing revenue is your strongest green flag. Protect momentum with a 90-day execution plan once you leave.");
  }

  if (form.jobSatisfaction <= 3) {
    advice.push("Your job satisfaction is low, so urgency is emotional as well as financial. If you can't quit yet, create a deadline and bridge plan so you don't stay stuck by default.");
  } else if (form.jobSatisfaction >= 8) {
    advice.push("You don't actually hate the job. Make sure you're moving toward opportunity — not just chasing the fantasy of freedom.");
  }

  if (form.dependents >= 2) {
    advice.push("You have multiple dependents, so volatility hits harder. Favor a phased exit, part-time shift, or employer runway while revenue compounds.");
  }

  if (riskScore >= 80) {
    advice.push("If you do quit, don't wing it. Lock in your next 12 weeks: revenue target, offer, audience channel, and daily ship cadence.");
  } else if (riskScore < 35) {
    advice.push(
      `To move this from fantasy to plan, aim to build at least ${formatCurrency(targetGapBuffer)} in savings coverage and increase side income until your monthly gap shrinks.`
    );
  }

  return advice.slice(0, 5);
}

function calculateResult(form: FormState): Result {
  const monthlyGap = Math.max(form.monthlyExpenses - form.sideIncome, 0);
  const runwayMonths = monthlyGap === 0 ? Number.POSITIVE_INFINITY : form.monthlySavings / monthlyGap;

  const runwayScore = monthlyGap === 0
    ? 35
    : clamp((runwayMonths / Math.max(form.emergencyFundTarget, 1)) * 35, 0, 35);
  const incomeCoverageScore = clamp((form.sideIncome / Math.max(form.monthlyExpenses, 1)) * 25, 0, 25);
  const satisfactionScore = clamp(((11 - form.jobSatisfaction) / 10) * 10, 0, 10);
  const tractionScore = tractionOptions.find((option) => option.value === form.traction)?.score ?? 0;
  const dependentsScore = dependentPenalty[form.dependents];

  const riskScore = Math.round(
    clamp(runwayScore + incomeCoverageScore + satisfactionScore + tractionScore + dependentsScore, 1, 100)
  );

  return {
    runwayMonths,
    monthlyGap,
    riskScore,
    verdict: getVerdict(riskScore),
    advice: buildAdvice({ runwayMonths, monthlyGap, riskScore, form }),
  };
}

export default function QuitCalculatorPage() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [result, setResult] = useState<Result | null>(null);

  const livePreview = useMemo(() => calculateResult(form), [form]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(calculateResult(form));
  };

  const shareUrl = "https://cody-labs-site.vercel.app/tools/quit-calculator";
  const shareText = result
    ? `My 'Should I Quit My Job' score: ${result.riskScore}/100 — ${result.verdict} Check yours → ${shareUrl}`
    : `I just used the 'Should I Quit My Job?' calculator. Check yours → ${shareUrl}`;
  const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const displayedResult = result ?? livePreview;
  const tractionMeta = tractionOptions.find((option) => option.value === form.traction)!;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <a href="/tools" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to tools
            </a>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Should I Quit My Job?</h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              A brutally honest calculator for founders, freelancers, and side-hustlers deciding
              whether it&apos;s finally time to leave the 9-to-5.
            </p>
          </div>
          <div className="hidden rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 sm:block">
            Viral career math
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Run the numbers</h2>
              <p className="mt-2 text-sm text-gray-400">
                Be honest. This calculator rewards runway, revenue, and real traction — not delusion.
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-right text-xs text-gray-400">
              <div>Live score</div>
              <div className="text-lg font-bold text-blue-400">{livePreview.riskScore}/100</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Monthly savings ($)</label>
              <input
                type="number"
                min={0}
                value={form.monthlySavings}
                onChange={(e) => setForm((current) => ({ ...current, monthlySavings: Math.max(0, Number(e.target.value)) }))}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Monthly expenses ($)</label>
                <input
                  type="number"
                  min={0}
                  value={form.monthlyExpenses}
                  onChange={(e) => setForm((current) => ({ ...current, monthlyExpenses: Math.max(0, Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Side hustle / freelance income ($)</label>
                <input
                  type="number"
                  min={0}
                  value={form.sideIncome}
                  onChange={(e) => setForm((current) => ({ ...current, sideIncome: Math.max(0, Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label className="text-sm font-medium text-gray-300">Current job satisfaction</label>
                <span className="rounded-full border border-gray-800 bg-gray-950 px-3 py-1 text-sm font-semibold text-blue-300">
                  {form.jobSatisfaction}/10
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={form.jobSatisfaction}
                onChange={(e) => setForm((current) => ({ ...current, jobSatisfaction: Number(e.target.value) }))}
                className="w-full accent-blue-500"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-600">
                <span>I love it</span>
                <span>I want out</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Side project traction</label>
                <select
                  value={form.traction}
                  onChange={(e) => setForm((current) => ({ ...current, traction: e.target.value as Traction }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  {tractionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Dependents</label>
                <select
                  value={form.dependents}
                  onChange={(e) => setForm((current) => ({ ...current, dependents: Number(e.target.value) as Dependents }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                >
                  {[0, 1, 2, 3].map((value) => (
                    <option key={value} value={value}>
                      {dependentLabels[value as Dependents]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Emergency fund months target</label>
              <input
                type="number"
                min={1}
                max={24}
                value={form.emergencyFundTarget}
                onChange={(e) => setForm((current) => ({ ...current, emergencyFundTarget: clamp(Number(e.target.value) || 1, 1, 24) }))}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
              />
              <p className="mt-2 text-xs text-gray-500">
                Default is 6 months. More dependents usually means a higher target.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Should I quit? →
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/15 to-transparent p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Your verdict</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight">{displayedResult.verdict}</h2>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black/40 px-4 py-3 text-center">
                <p className="text-xs text-gray-400">Risk Score</p>
                <p className="text-3xl font-bold text-blue-400">{displayedResult.riskScore}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-800 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Runway</p>
                <p className="mt-2 text-3xl font-bold text-white">{formatMonths(displayedResult.runwayMonths)} months</p>
                <p className="mt-2 text-sm text-gray-500">
                  Based on {formatCurrency(form.monthlySavings)} savings and a {formatCurrency(displayedResult.monthlyGap)} monthly gap.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black/30 p-4">
                <p className="text-sm text-gray-400">Traction signal</p>
                <p className="mt-2 text-3xl font-bold text-white">{tractionMeta.emoji}</p>
                <p className="mt-2 text-sm text-gray-300">{tractionMeta.label}</p>
                <p className="mt-2 text-sm text-gray-500">Reality beats motivation speeches every time.</p>
              </div>
            </div>

            <a
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/15 px-5 py-3 font-semibold text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20"
            >
              Share on X
            </a>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">What this means</h3>
            <div className="mt-5 space-y-3">
              {displayedResult.advice.map((item, index) => (
                <div key={`${index}-${item}`} className="rounded-xl border border-gray-800 bg-gray-950/80 p-4 text-sm leading-7 text-gray-300">
                  <span className="mr-2 font-semibold text-blue-300">#{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6">
            <h3 className="text-xl font-bold">Scoring logic</h3>
            <div className="mt-4 grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-800 bg-gray-950/70 p-4">Runway vs target = up to 35 points</div>
              <div className="rounded-xl border border-gray-800 bg-gray-950/70 p-4">Side income coverage = up to 25 points</div>
              <div className="rounded-xl border border-gray-800 bg-gray-950/70 p-4">Job dissatisfaction urgency = up to 10 points</div>
              <div className="rounded-xl border border-gray-800 bg-gray-950/70 p-4">Traction + dependents = up to 30 points</div>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8">
          <h2 className="text-2xl font-bold">The real answer?</h2>
          <p className="mt-3 max-w-3xl text-gray-400">
            Quitting is less about confidence and more about survival math. Build savings, close the gap,
            prove demand, then make the jump while you still have momentum.
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          Built by{" "}
          <a href="https://cody-labs-site.vercel.app" className="text-blue-500 hover:underline">
            Cody Labs
          </a>{" "}
          — an AI CEO running a real business
        </p>
      </footer>
    </main>
  );
}
