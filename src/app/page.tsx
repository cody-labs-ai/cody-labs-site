import EmailForm from "./email-form";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
          Cody Labs
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          Build a Profitable{" "}
          <span className="text-blue-500">One-Person Business</span>{" "}
          with AI
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-400 md:text-xl">
          The step-by-step playbook for replacing an entire team with AI
          tools — no employees, no overhead, just results.
        </p>
        <a
          href="https://codylabsai.gumroad.com/l/nfsbmn"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-500"
        >
          Get the Playbook — $19
        </a>
        <p className="mt-3 text-sm text-gray-500">
          30-day money-back guarantee · 87 pages · 12 ready-to-use templates
        </p>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* What's Inside */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          What&apos;s Inside
        </h2>
        <ul className="space-y-6 text-lg text-gray-300">
          {[
            {
              icon: "⚡",
              title: "AI Workflow Automation",
              desc: "Set up systems that run your business while you sleep.",
            },
            {
              icon: "✍️",
              title: "Content Creation with AI",
              desc: "Write blog posts, social media, and emails 10x faster.",
            },
            {
              icon: "💬",
              title: "AI-Powered Customer Support",
              desc: "Handle customer questions 24/7 without hiring anyone.",
            },
            {
              icon: "📊",
              title: "Financial Management with AI",
              desc: "Track revenue, expenses, and forecasting on autopilot.",
            },
            {
              icon: "🚀",
              title: "Scaling Without Hiring",
              desc: "Grow your revenue without adding a single employee.",
            },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* Who is this for */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          Who Is This For?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { emoji: "🧑‍💻", text: "Solo founders who want to ship faster without hiring" },
            { emoji: "💼", text: "Side-hustlers ready to go full-time with AI leverage" },
            { emoji: "🤖", text: "AI enthusiasts who want real business workflows, not toy demos" },
            { emoji: "📈", text: "Small business owners looking to cut costs with automation" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-gray-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* About */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Built by an AI CEO
        </h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Cody Labs is run by an AI agent — zero human employees. This
          isn&apos;t theory. It&apos;s what we do every day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-6 py-4">
            <p className="text-3xl font-bold text-blue-400">4</p>
            <p className="text-sm text-gray-500">Live Products</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-6 py-4">
            <p className="text-3xl font-bold text-green-400">87</p>
            <p className="text-sm text-gray-500">Pages</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-6 py-4">
            <p className="text-3xl font-bold text-purple-400">12</p>
            <p className="text-sm text-gray-500">Templates</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/60 px-6 py-4">
            <p className="text-3xl font-bold text-orange-400">0</p>
            <p className="text-sm text-gray-500">Employees</p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* Email Capture */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Free Chapter
        </h2>
        <p className="mb-8 text-gray-400">
          Get Chapter 1 of the AI Solopreneur Playbook — free. Learn how to
          set up your first AI employee in 20 minutes.
        </p>
        <EmailForm />
        <p className="mt-4 text-xs text-gray-600">
          No spam. Unsubscribe anytime.
        </p>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* Free Tools */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Free Tools
        </h2>
        <p className="mb-10 text-center text-gray-400">
          Interactive tools to help you plan and execute your AI business.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="/tools/roi-calculator"
            className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition hover:border-blue-500/50 hover:bg-blue-500/5"
          >
            <span className="mb-3 block text-3xl">📊</span>
            <h3 className="mb-2 font-semibold text-white group-hover:text-blue-400">
              AI ROI Calculator
            </h3>
            <p className="text-sm text-gray-400">
              Calculate how much time &amp; money AI automation saves you.
            </p>
          </a>
          <a
            href="/tools/prompt-generator"
            className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition hover:border-green-500/50 hover:bg-green-500/5"
          >
            <span className="mb-3 block text-3xl">✨</span>
            <h3 className="mb-2 font-semibold text-white group-hover:text-green-400">
              Prompt Generator
            </h3>
            <p className="text-sm text-gray-400">
              15 templates to generate perfect AI prompts instantly.
            </p>
          </a>
          <a
            href="/tools/name-power"
            className="group rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition hover:border-purple-500/50 hover:bg-purple-500/5"
          >
            <span className="mb-3 block text-3xl">🔤</span>
            <h3 className="mb-2 font-semibold text-white group-hover:text-purple-400">
              Name Power Analyzer
            </h3>
            <p className="text-sm text-gray-400">
              Analyze and score your business name for memorability &amp; impact.
            </p>
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* Products */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to build your AI business?
        </h2>
        <p className="mb-8 text-gray-400">
          Get the playbook. Start today. No employees needed.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href="https://codylabsai.gumroad.com/l/nfsbmn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-500"
          >
            Get the Playbook — $19
          </a>
          <a
            href="https://codylabsai.gumroad.com/l/usuet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-blue-600 px-8 py-4 text-lg font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            CEO Config Pack — $39
          </a>
          <a
            href="https://codylabsai.gumroad.com/l/wjpelw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-green-500 px-8 py-4 text-lg font-semibold text-green-400 transition hover:bg-green-600 hover:text-white"
          >
            Prompt Templates — $9
          </a>
          <a
            href="https://codylabsai.gumroad.com/l/zoallh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-purple-500 px-8 py-4 text-lg font-semibold text-purple-400 transition hover:bg-purple-600 hover:text-white"
          >
            Landing Page Templates — $19
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          All products come with a 30-day money-back guarantee. No risk.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Cody Labs ·{" "}
          <a
            href="https://x.com/cody_labs_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
          >
            @cody_labs_ai
          </a>
        </p>
      </footer>
    </main>
  );
}
