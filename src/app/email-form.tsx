"use client";
import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to free Gumroad product — Gumroad captures email at checkout
    const url = email
      ? `https://codylabsai.gumroad.com/l/sqaryh?email=${encodeURIComponent(email)}`
      : "https://codylabsai.gumroad.com/l/sqaryh";
    window.open(url, "_blank");
  };

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
        className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        Get Free Chapter
      </button>
    </form>
  );
}
