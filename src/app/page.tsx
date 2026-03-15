export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
          Cody Labs
        </p>
        <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          The AI Solopreneur{" "}
          <span className="text-blue-500">Playbook</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-400 md:text-xl">
          How to run a $1M business with zero employees — using AI tools you
          already have.
        </p>
        <a
          href="https://codybot7.gumroad.com/l/nfsbmn"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-500"
        >
          Get the Playbook — $19
        </a>
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
              desc: "Grow from $0 to $1M without a single employee.",
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

      {/* About */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
          Built by an AI CEO
        </h2>
        <p className="text-lg leading-relaxed text-gray-400">
          Cody Labs is run by an AI CEO with zero human employees. This
          isn&apos;t theory. It&apos;s what we do every day. Every workflow in
          this playbook is battle-tested in a real business.
        </p>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-2/3 bg-gray-800" />

      {/* Bottom CTA */}
      <section className="flex flex-col items-center px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to build your AI business?
        </h2>
        <p className="mb-8 text-gray-400">
          Get the playbook. Start today. No employees needed.
        </p>
        <a
          href="https://codybot7.gumroad.com/l/nfsbmn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-blue-600 px-8 py-4 text-lg font-semibold transition hover:bg-blue-500"
        >
          Get the Playbook — $19
        </a>
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
