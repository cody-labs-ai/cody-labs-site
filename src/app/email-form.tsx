"use client";
import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Use Gumroad's subscribe endpoint
      const res = await fetch("https://app.gumroad.com/follow_from_embed_form", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          seller_id: "2630498228037",
          email: email,
        }),
      });
      if (res.ok || res.status === 302) {
        setStatus("success");
      } else {
        // Fallback: even if Gumroad CORS blocks, open in new tab
        window.open(
          `https://codylabsai.gumroad.com/follow?email=${encodeURIComponent(email)}`,
          "_blank"
        );
        setStatus("success");
      }
    } catch {
      // CORS will likely block this, use redirect fallback
      window.open(
        `https://codylabsai.gumroad.com/follow?email=${encodeURIComponent(email)}`,
        "_blank"
      );
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-green-800 bg-green-950/30 p-8 text-center">
        <p className="text-2xl">🎉</p>
        <p className="mt-2 text-lg font-semibold text-green-400">You&apos;re in!</p>
        <p className="mt-1 text-sm text-gray-400">
          Check your email for the free chapter.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-gray-700 bg-gray-900 px-6 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Get Free Chapter"}
      </button>
    </form>
  );
}
