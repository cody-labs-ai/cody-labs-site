"use client";

import { useMemo, useState } from "react";

type FormState = {
  monthlyActiveUsers: number;
  averageRevenuePerUser: number;
  monthlyChurnRate: number;
  customerAcquisitionCost: number;
  monthlyOperatingCosts: number;
};

type MetricTone = "green" | "yellow" | "red";

type MetricCardProps = {
  label: string;
  value: string;
  tone: MetricTone;
  insight: string;
};

const defaultForm: FormState = {
  monthlyActiveUsers: 1200,
  averageRevenuePerUser: 29,
  monthlyChurnRate: 4,
  customerAcquisitionCost: 180,
  monthlyOperatingCosts: 12000,
};

function clampNumber(value: number, min = 0) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return min;
  return Math.max(min, value);
}

function formatCurrency(value: number, maximumFractionDigits = 0) {
  if (!Number.isFinite(value)) return "∞";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  });
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) return "∞";
  return value.toLocaleString("en-US", { maximumFractionDigits });
}

function getToneClasses(tone: MetricTone) {
  if (tone === "green") {
    return {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-300",
      dot: "bg-emerald-400",
    };
  }

  if (tone === "yellow") {
    return {
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      text: "text-amber-300",
      dot: "bg-amber-400",
    };
  }

  return {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-300",
    dot: "bg-red-400",
  };
}

function getLtvTone(ltv: number) {
  if (ltv >= 600) return "green";
  if (ltv >= 250) return "yellow";
  return "red";
}

function getRatioTone(ratio: number) {
  if (ratio >= 3) return "green";
  if (ratio >= 1.5) return "yellow";
  return "red";
}

function getRecoveryTone(months: number) {
  if (months <= 6) return "green";
  if (months <= 12) return "yellow";
  return "red";
}

function getChurnTone(churn: number) {
  if (churn <= 3) return "green";
  if (churn <= 6) return "yellow";
  return "red";
}

function getBreakEvenTone(users: number, currentUsers: number) {
  if (users <= currentUsers) return "green";
  if (users <= currentUsers * 1.35) return "yellow";
  return "red";
}

function MetricCard({ label, value, tone, insight }: MetricCardProps) {
  const classes = getToneClasses(tone);

  return (
    <div className={`rounded-2xl border ${classes.border} ${classes.bg} p-5`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-400">{label}</p>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-gray-300">
          <span className={`h-2.5 w-2.5 rounded-full ${classes.dot}`} />
          {tone}
        </span>
      </div>
      <p className={`mt-4 text-3xl font-bold ${classes.text}`}>{value}</p>
      <p className="mt-3 text-sm leading-6 text-gray-400">{insight}</p>
    </div>
  );
}

export default function SaasPricingCalculatorPage() {
  const [form, setForm] = useState<FormState>(defaultForm);

  const metrics = useMemo(() => {
    const mrr = form.monthlyActiveUsers * form.averageRevenuePerUser;
    const arr = mrr * 12;
    const churnDecimal = form.monthlyChurnRate / 100;
    const ltv = churnDecimal > 0 ? form.averageRevenuePerUser / churnDecimal : Number.POSITIVE_INFINITY;
    const ltvToCac = form.customerAcquisitionCost > 0 ? ltv / form.customerAcquisitionCost : Number.POSITIVE_INFINITY;
    const monthsToRecoverCac = form.averageRevenuePerUser > 0 ? form.customerAcquisitionCost / form.averageRevenuePerUser : Number.POSITIVE_INFINITY;
    const breakEvenUsers = form.averageRevenuePerUser > 0 ? Math.ceil(form.monthlyOperatingCosts / form.averageRevenuePerUser) : 0;
    const monthlyProfit = mrr - form.monthlyOperatingCosts;

    return {
      mrr,
      arr,
      ltv,
      ltvToCac,
      monthsToRecoverCac,
      breakEvenUsers,
      monthlyProfit,
    };
  }, [form]);

  const shareUrl = "https://cody-labs-site.vercel.app/tools/saas-pricing";
  const shareText = `I ran my SaaS numbers with Cody Labs' pricing calculator: MRR ${formatCurrency(metrics.mrr)}, ARR ${formatCurrency(metrics.arr)}, LTV:CAC ${formatNumber(metrics.ltvToCac, 1)}x. Check yours → ${shareUrl}`;
  const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <a href="/tools" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to tools
            </a>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">SaaS Pricing Calculator</h1>
            <p className="mt-3 max-w-3xl text-gray-400">
              Pressure-test your pricing model with the metrics investors, operators, and smart founders actually watch.
            </p>
          </div>
          <div className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 sm:block">
            MRR sanity check
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Enter your SaaS economics</h2>
              <p className="mt-2 text-sm text-gray-400">
                Update your assumptions and the model recalculates instantly.
              </p>
            </div>
            <div className="rounded-xl border border-gray-800 bg-gray-950 px-3 py-2 text-right text-xs text-gray-400">
              <div>Monthly profit</div>
              <div className={`text-lg font-bold ${metrics.monthlyProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {formatCurrency(metrics.monthlyProfit)}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Monthly Active Users</label>
              <input
                type="number"
                min={0}
                value={form.monthlyActiveUsers}
                onChange={(e) => setForm((current) => ({ ...current, monthlyActiveUsers: clampNumber(Number(e.target.value)) }))}
                className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Average Revenue Per User ($)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.averageRevenuePerUser}
                  onChange={(e) => setForm((current) => ({ ...current, averageRevenuePerUser: clampNumber(Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Monthly Churn Rate (%)</label>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={form.monthlyChurnRate}
                  onChange={(e) => setForm((current) => ({ ...current, monthlyChurnRate: clampNumber(Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Customer Acquisition Cost ($)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.customerAcquisitionCost}
                  onChange={(e) => setForm((current) => ({ ...current, customerAcquisitionCost: clampNumber(Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Monthly Operating Costs ($)</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.monthlyOperatingCosts}
                  onChange={(e) => setForm((current) => ({ ...current, monthlyOperatingCosts: clampNumber(Number(e.target.value)) }))}
                  className="w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-950/70 p-5">
            <h3 className="text-lg font-bold">How to read this</h3>
            <div className="mt-4 grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-800 bg-black/40 p-4">Green = healthy SaaS math worth scaling.</div>
              <div className="rounded-xl border border-gray-800 bg-black/40 p-4">Yellow = workable, but needs pricing or retention improvements.</div>
              <div className="rounded-xl border border-gray-800 bg-black/40 p-4">Red = dangerous economics. Fix before pouring in more acquisition.</div>
              <div className="rounded-xl border border-gray-800 bg-black/40 p-4">LTV uses the standard formula: ARPU ÷ churn rate.</div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 to-transparent p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Snapshot</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight">Your pricing model at a glance</h2>
              </div>
              <div className="rounded-2xl border border-gray-800 bg-black/40 px-4 py-3 text-center">
                <p className="text-xs text-gray-400">Churn health</p>
                <p className={`text-3xl font-bold ${getChurnTone(form.monthlyChurnRate) === "green" ? "text-emerald-400" : getChurnTone(form.monthlyChurnRate) === "yellow" ? "text-amber-400" : "text-red-400"}`}>
                  {formatNumber(form.monthlyChurnRate, 1)}%
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <MetricCard
                label="Monthly Recurring Revenue"
                value={formatCurrency(metrics.mrr)}
                tone={metrics.monthlyProfit >= 0 ? "green" : metrics.mrr >= form.monthlyOperatingCosts * 0.75 ? "yellow" : "red"}
                insight="MRR is your active users multiplied by ARPU. If this trails your cost base, your model still needs room to breathe."
              />
              <MetricCard
                label="Annual Recurring Revenue"
                value={formatCurrency(metrics.arr)}
                tone={metrics.arr >= form.monthlyOperatingCosts * 12 ? "green" : metrics.arr >= form.monthlyOperatingCosts * 9 ? "yellow" : "red"}
                insight="ARR gives you the 12-month view. It is the fastest way to frame your current scale for planning and fundraising."
              />
              <MetricCard
                label="Lifetime Value"
                value={formatCurrency(metrics.ltv)}
                tone={getLtvTone(metrics.ltv)}
                insight="Higher LTV means each new customer gives you more room to spend, retain, and reinvest."
              />
              <MetricCard
                label="LTV : CAC Ratio"
                value={`${formatNumber(metrics.ltvToCac, 1)}x`}
                tone={getRatioTone(metrics.ltvToCac)}
                insight="A strong SaaS business usually wants 3x+ here. Below that, acquisition gets uncomfortable fast."
              />
              <MetricCard
                label="Months to Recover CAC"
                value={`${formatNumber(metrics.monthsToRecoverCac, 1)} mo`}
                tone={getRecoveryTone(metrics.monthsToRecoverCac)}
                insight="The faster you earn back CAC, the less cash pressure your growth engine creates."
              />
              <MetricCard
                label="Break-even Users Needed"
                value={formatNumber(metrics.breakEvenUsers, 0)}
                tone={getBreakEvenTone(metrics.breakEvenUsers, form.monthlyActiveUsers)}
                insight="This is how many active users you need for revenue to cover operating costs at your current ARPU."
              />
            </div>

            <a
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-5 py-3 font-semibold text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-500/20"
            >
              Share on X
            </a>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8">
            <h3 className="text-2xl font-bold">Operator notes</h3>
            <div className="mt-5 space-y-3 text-sm leading-7 text-gray-300">
              <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-4">
                <span className="font-semibold text-cyan-300">MRR vs costs:</span>{" "}
                {metrics.monthlyProfit >= 0
                  ? "You are covering your monthly operating costs at the current pricing level."
                  : "You are still underwater on monthly costs, which means retention, pricing, or both need work."}
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-4">
                <span className="font-semibold text-cyan-300">Churn pressure:</span>{" "}
                {form.monthlyChurnRate <= 3
                  ? "Retention looks healthy. Pricing improvements here can compound beautifully."
                  : form.monthlyChurnRate <= 6
                    ? "Churn is survivable, but it is quietly capping LTV. Improve onboarding and habit loops."
                    : "Churn is too high for comfortable scaling. Fix product stickiness before buying more traffic."}
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-950/80 p-4">
                <span className="font-semibold text-cyan-300">Acquisition efficiency:</span>{" "}
                {metrics.ltvToCac >= 3
                  ? "Your acquisition math is healthy enough to scale with confidence."
                  : metrics.ltvToCac >= 1.5
                    ? "You can probably grow, but the margin for error is thinner than you want."
                    : "You are paying too much for what each customer is worth. Tighten CAC or raise value fast."}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          Built by{" "}
          <a href="https://cody-labs-site.vercel.app" className="text-cyan-400 hover:underline">
            Cody Labs
          </a>{" "}
          — an AI CEO running a real business
        </p>
      </footer>
    </main>
  );
}
