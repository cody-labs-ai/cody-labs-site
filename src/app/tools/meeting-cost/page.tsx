"use client";

import { useEffect, useMemo, useState } from "react";

type FormState = {
  attendees: number;
  annualSalary: number;
  durationMinutes: number;
  meetingsPerWeek: number;
};

type CalculationResult = {
  hourlyRate: number;
  costPerMeeting: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
  hoursWastedPerYear: number;
};

const defaultForm: FormState = {
  attendees: 8,
  annualSalary: 95000,
  durationMinutes: 60,
  meetingsPerWeek: 5,
};

const WORK_HOURS_PER_YEAR = 2080;
const WEEKS_PER_MONTH = 52 / 12;
const IPHONE_PRICE = 999;
const TOKYO_FLIGHT_PRICE = 1200;
const NETFLIX_MONTHLY_PRICE = 15.49;
const JUNIOR_DEV_SALARY = 70000;

function clampMin(value: number, min = 0) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, value);
}

function formatCurrency(value: number, maximumFractionDigits = 0) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  });
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString("en-US", {
    maximumFractionDigits,
  });
}

function calculateMeetingCost(form: FormState): CalculationResult {
  const hourlyRate = form.annualSalary / WORK_HOURS_PER_YEAR;
  const costPerMeeting = hourlyRate * form.attendees * (form.durationMinutes / 60);
  const weeklyCost = costPerMeeting * form.meetingsPerWeek;
  const monthlyCost = weeklyCost * WEEKS_PER_MONTH;
  const annualCost = weeklyCost * 52;
  const hoursWastedPerYear = form.attendees * (form.durationMinutes / 60) * form.meetingsPerWeek * 52;

  return {
    hourlyRate,
    costPerMeeting,
    weeklyCost,
    monthlyCost,
    annualCost,
    hoursWastedPerYear,
  };
}

export default function MeetingCostCalculatorPage() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const result = useMemo(() => calculateMeetingCost(form), [form]);

  useEffect(() => {
    if (!timerRunning) return;

    const interval = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const liveMeetingCost = result.costPerMeeting * (elapsedSeconds / Math.max(form.durationMinutes * 60, 1));
  const shareUrl = "https://cody-labs-site.vercel.app/tools/meeting-cost";
  const shareText = `Our weekly meetings cost ${formatCurrency(result.annualCost)}\/year. Calculate yours → ${shareUrl}`;
  const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const comparisons = [
    {
      label: "iPhones",
      value: result.annualCost / IPHONE_PRICE,
      accent: "text-pink-300",
    },
    {
      label: "flights to Tokyo",
      value: result.annualCost / TOKYO_FLIGHT_PRICE,
      accent: "text-cyan-300",
    },
    {
      label: "months of Netflix",
      value: result.annualCost / NETFLIX_MONTHLY_PRICE,
      accent: "text-red-300",
    },
    {
      label: "junior developer salaries",
      value: result.annualCost / JUNIOR_DEV_SALARY,
      accent: "text-emerald-300",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <a href="/tools" className="text-sm text-gray-400 transition hover:text-white">
              ← Back to tools
            </a>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Meeting Cost Calculator
            </h1>
            <p className="mt-4 max-w-3xl text-base text-gray-400 sm:text-lg">
              Every meeting feels free until you multiply salary, headcount, and repetition. This tool shows
              what your calendar is quietly burning every week.
            </p>
          </div>
          <div className="hidden rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200 sm:block">
            Viral business math
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-orange-300">Plug in your calendar addiction</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Run the damage</h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-right">
              <div className="text-xs text-gray-500">Blended hourly rate</div>
              <div className="mt-1 text-xl font-bold text-orange-300">{formatCurrency(result.hourlyRate, 2)}</div>
            </div>
          </div>

          <form className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Number of attendees</label>
              <input
                type="number"
                min={1}
                value={form.attendees}
                onChange={(e) => setForm((current) => ({ ...current, attendees: clampMin(Number(e.target.value), 1) }))}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Average annual salary per attendee ($)</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={form.annualSalary}
                  onChange={(e) => setForm((current) => ({ ...current, annualSalary: clampMin(Number(e.target.value)) }))}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-400"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Meeting duration (minutes)</label>
                <input
                  type="number"
                  min={1}
                  value={form.durationMinutes}
                  onChange={(e) => setForm((current) => ({ ...current, durationMinutes: clampMin(Number(e.target.value), 1) }))}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Meetings per week</label>
              <input
                type="number"
                min={0}
                value={form.meetingsPerWeek}
                onChange={(e) => setForm((current) => ({ ...current, meetingsPerWeek: clampMin(Number(e.target.value)) }))}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-orange-400"
              />
            </div>
          </form>

          <div className="mt-8 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-orange-200">Live meeting meter</p>
                <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                  This meeting has cost {formatCurrency(liveMeetingCost, 2)} so far
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Based on {form.attendees} people at {formatCurrency(form.annualSalary)} average salary.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setTimerRunning(true)}
                  className="rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-black transition hover:bg-orange-400"
                >
                  Start Meeting Timer
                </button>
                <button
                  type="button"
                  onClick={() => setTimerRunning(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Pause
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerRunning(false);
                    setElapsedSeconds(0);
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-300">The damage report</p>
                <h2 className="mt-2 text-3xl font-bold">One meeting. Four ways to regret it.</h2>
              </div>
              <a
                href={shareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 sm:inline-flex"
              >
                Share on X
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Cost per meeting</p>
                <p className="mt-3 text-3xl font-bold text-white">{formatCurrency(result.costPerMeeting)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Weekly cost</p>
                <p className="mt-3 text-3xl font-bold text-white">{formatCurrency(result.weeklyCost)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Monthly cost</p>
                <p className="mt-3 text-3xl font-bold text-white">{formatCurrency(result.monthlyCost)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-gray-400">Annual cost</p>
                <p className="mt-3 text-3xl font-bold text-orange-300">{formatCurrency(result.annualCost)}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
              <p className="text-sm text-red-200">Hours wasted per year</p>
              <p className="mt-2 text-4xl font-bold text-white">{formatNumber(result.hoursWastedPerYear)}</p>
              <p className="mt-2 text-sm text-red-100/70">
                That&apos;s the combined human time spent in these meetings across your team each year.
              </p>
            </div>

            <a
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 px-5 py-4 font-semibold text-orange-100 transition hover:bg-orange-500/20 sm:hidden"
            >
              Share on X
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Fun comparisons</p>
            <h3 className="mt-2 text-2xl font-bold">That&apos;s equivalent to...</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {comparisons.map((comparison) => (
                <div key={comparison.label} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <p className="text-sm text-gray-400">{comparison.label}</p>
                  <p className={`mt-2 text-3xl font-bold ${comparison.accent}`}>{formatNumber(comparison.value)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6">
            <h3 className="text-xl font-bold">Why this tool spreads</h3>
            <p className="mt-3 text-sm leading-7 text-gray-400">
              Nobody feels a 60-minute meeting on the calendar. They feel the annual burn once you translate it
              into money, lost focus, and absurd real-world tradeoffs.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        Built by Cody Labs — an AI CEO running a real business
      </footer>
    </main>
  );
}
