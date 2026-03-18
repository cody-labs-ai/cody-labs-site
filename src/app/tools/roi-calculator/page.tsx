"use client";

import { useState, useEffect, useRef } from "react";

type Category = {
  name: string;
  icon: string;
  hoursPerWeek: number;
  automationPotential: number;
};

const defaultCategories: Category[] = [
  { name: "Content Creation", icon: "✍️", hoursPerWeek: 5, automationPotential: 0.5 },
  { name: "Customer Support", icon: "💬", hoursPerWeek: 3, automationPotential: 0.75 },
  { name: "Admin & Ops", icon: "📋", hoursPerWeek: 4, automationPotential: 0.9 },
  { name: "Marketing", icon: "📣", hoursPerWeek: 5, automationPotential: 0.5 },
  { name: "Product Dev", icon: "🛠️", hoursPerWeek: 8, automationPotential: 0.25 },
];

const automationOptions = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "90%", value: 0.9 },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<number>(0);

  useEffect(() => {
    const start = ref.current;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        ref.current = end;
      }
    }
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}
      {display >= 1000
        ? display.toLocaleString("en-US", { maximumFractionDigits: 0 })
        : display.toFixed(display < 10 ? 1 : 0)}
      {suffix}
    </span>
  );
}

export default function ROICalculatorPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [aiToolCost, setAiToolCost] = useState(100);
  const [showResults, setShowResults] = useState(false);

  const updateCategory = (index: number, field: keyof Category, value: number) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Calculations
  const totalHoursPerWeek = categories.reduce((sum, c) => sum + c.hoursPerWeek, 0);
  const hoursSavedPerWeek = categories.reduce(
    (sum, c) => sum + c.hoursPerWeek * c.automationPotential,
    0
  );
  const hoursSavedPerMonth = hoursSavedPerWeek * 4.33;
  const moneySavedPerMonth = hoursSavedPerMonth * hourlyRate;
  const netSavingsPerMonth = moneySavedPerMonth - aiToolCost;
  const roiPercentage = aiToolCost > 0 ? ((moneySavedPerMonth - aiToolCost) / aiToolCost) * 100 : 0;
  const breakEvenDays = moneySavedPerMonth > 0 ? Math.ceil((aiToolCost / moneySavedPerMonth) * 30) : 999;
  const annualSavings = netSavingsPerMonth * 12;

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <a href="/" className="text-lg font-bold">
            Cody Labs
          </a>
          <a
            href="/tools/prompt-generator"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Prompt Generator
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            AI Solopreneur ROI Calculator
          </h1>
          <p className="text-lg text-gray-400">
            Find out how much time and money you could save by automating with AI.
          </p>
        </div>

        {/* Hourly Rate & AI Cost */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <label className="mb-2 block text-sm font-medium text-gray-400">
              Your Hourly Rate ($)
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-2xl font-bold text-white focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              What&apos;s your time worth? Use your billing rate or salary equivalent.
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
            <label className="mb-2 block text-sm font-medium text-gray-400">
              AI Tools Cost ($/month)
            </label>
            <input
              type="number"
              min={0}
              max={10000}
              value={aiToolCost}
              onChange={(e) => setAiToolCost(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-2xl font-bold text-white focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              ChatGPT, Claude, Midjourney, Zapier, etc. combined.
            </p>
          </div>
        </div>

        {/* Task Categories */}
        <div className="mb-10">
          <h2 className="mb-6 text-2xl font-bold">Your Weekly Tasks</h2>
          <div className="space-y-4">
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-lg font-semibold">{cat.name}</h3>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Hours slider */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm text-gray-400">Hours / week</label>
                      <span className="rounded bg-gray-800 px-2 py-1 text-sm font-mono font-bold text-blue-400">
                        {cat.hoursPerWeek}h
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={40}
                      value={cat.hoursPerWeek}
                      onChange={(e) =>
                        updateCategory(i, "hoursPerWeek", Number(e.target.value))
                      }
                      className="w-full accent-blue-500"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-600">
                      <span>0h</span>
                      <span>20h</span>
                      <span>40h</span>
                    </div>
                  </div>
                  {/* Automation potential dropdown */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm text-gray-400">
                        AI Automation Potential
                      </label>
                    </div>
                    <select
                      value={cat.automationPotential}
                      onChange={(e) =>
                        updateCategory(
                          i,
                          "automationPotential",
                          Number(e.target.value)
                        )
                      }
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    >
                      {automationOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label} of tasks can be automated
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mb-12 text-center">
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-blue-600 px-10 py-4 text-lg font-bold text-white transition hover:bg-blue-500 hover:scale-105 active:scale-95"
          >
            Calculate My ROI →
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="mb-16 animate-in fade-in">
            <h2 className="mb-8 text-center text-3xl font-bold">Your AI ROI</h2>

            {/* Main stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-6 text-center">
                <p className="mb-1 text-sm text-blue-400">Hours Saved / Month</p>
                <p className="text-3xl font-bold text-blue-400">
                  <AnimatedCounter value={hoursSavedPerMonth} suffix="h" />
                </p>
              </div>
              <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                <p className="mb-1 text-sm text-green-400">Money Saved / Month</p>
                <p className="text-3xl font-bold text-green-400">
                  <AnimatedCounter value={moneySavedPerMonth} prefix="$" />
                </p>
              </div>
              <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-6 text-center">
                <p className="mb-1 text-sm text-purple-400">ROI</p>
                <p className="text-3xl font-bold text-purple-400">
                  <AnimatedCounter value={roiPercentage} suffix="%" />
                </p>
              </div>
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-6 text-center">
                <p className="mb-1 text-sm text-orange-400">Break-even</p>
                <p className="text-3xl font-bold text-orange-400">
                  <AnimatedCounter value={breakEvenDays} suffix=" days" />
                </p>
              </div>
            </div>

            {/* Detail breakdown */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8">
              <h3 className="mb-6 text-xl font-bold">Breakdown</h3>
              <div className="space-y-4">
                {categories.map((cat) => {
                  const saved = cat.hoursPerWeek * cat.automationPotential * 4.33;
                  const value = saved * hourlyRate;
                  return (
                    <div key={cat.name} className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-gray-300">{cat.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-green-400">
                          {saved.toFixed(1)}h saved
                        </span>
                        <span className="ml-4 font-mono text-gray-400">
                          (${value.toLocaleString("en-US", { maximumFractionDigits: 0 })})
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <span className="text-gray-300">AI Tool Costs</span>
                  <span className="font-mono text-red-400">
                    -${aiToolCost.toLocaleString("en-US")}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 text-lg font-bold">
                  <span>Net Monthly Savings</span>
                  <span className={netSavingsPerMonth >= 0 ? "text-green-400" : "text-red-400"}>
                    ${netSavingsPerMonth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Annual Savings</span>
                  <span className={annualSavings >= 0 ? "text-green-400" : "text-red-400"}>
                    ${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 text-center">
              <h3 className="mb-3 text-2xl font-bold">
                Want the full playbook?
              </h3>
              <p className="mb-6 text-gray-400">
                Learn exactly how to set up AI automation for your solo business.
                Step-by-step frameworks, tool recommendations, and real workflows.
              </p>
              <a
                href="https://codylabsai.gumroad.com/l/nfsbmn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-blue-500"
              >
                Get the AI Solopreneur Playbook — $19
              </a>
            </div>
          </div>
        )}

        {/* Bottom tip */}
        <div className="mt-16 border-t border-gray-800 pt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">More Free Tools</h2>
          <p className="mb-6 text-gray-400">
            Explore our other tools built for AI solopreneurs.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="/tools/prompt-generator"
              className="inline-block rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-gray-600 hover:bg-gray-800"
            >
              Prompt Generator →
            </a>
            <a
              href="/tools/name-power"
              className="inline-block rounded-lg border border-gray-700 px-6 py-3 font-semibold text-white transition hover:border-gray-600 hover:bg-gray-800"
            >
              Name Power Analyzer →
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
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
  );
}
