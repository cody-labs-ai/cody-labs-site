"use client";

import { useState } from "react";

// Simple hash function for deterministic results
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Generate deterministic stat from name and seed
function generateStat(name: string, seed: number, min: number, max: number): number {
  const hash = hashString(name + seed.toString());
  return min + (hash % (max - min + 1));
}

type Stats = {
  attack: number;
  defense: number;
  speed: number;
  luck: number;
  charisma: number;
  total: number;
};

type Rank = "S" | "A" | "B" | "C" | "D" | "F";

function calculateRank(total: number): Rank {
  if (total >= 40000) return "S";
  if (total >= 30000) return "A";
  if (total >= 20000) return "B";
  if (total >= 10000) return "C";
  if (total >= 5000) return "D";
  return "F";
}

function getRankComment(rank: Rank): string {
  const comments: Record<Rank, string> = {
    S: "🔥 宇宙最強クラス！伝説の戦士だ！",
    A: "⚡ 超一流！このパワーは本物だ！",
    B: "💪 かなり強い！素質は十分！",
    C: "👍 平均以上！まだ伸びしろあり！",
    D: "🌱 まだまだこれから！修行あるのみ！",
    F: "😅 ポテンシャルは未知数…！",
  };
  return comments[rank];
}

function getRankColor(rank: Rank): string {
  const colors: Record<Rank, string> = {
    S: "from-yellow-400 via-orange-500 to-red-600",
    A: "from-purple-400 via-pink-500 to-red-500",
    B: "from-blue-400 via-cyan-500 to-teal-500",
    C: "from-green-400 via-emerald-500 to-teal-600",
    D: "from-gray-400 via-gray-500 to-gray-600",
    F: "from-slate-400 via-slate-500 to-slate-600",
  };
  return colors[rank];
}

export default function NamePowerPage() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const trimmedName = name.trim();
    const calculatedStats: Stats = {
      attack: generateStat(trimmedName, 1, 1, 9999),
      defense: generateStat(trimmedName, 2, 1, 9999),
      speed: generateStat(trimmedName, 3, 1, 9999),
      luck: generateStat(trimmedName, 4, 1, 9999),
      charisma: generateStat(trimmedName, 5, 1, 9999),
      total: 0,
    };
    calculatedStats.total =
      calculatedStats.attack +
      calculatedStats.defense +
      calculatedStats.speed +
      calculatedStats.luck +
      calculatedStats.charisma;

    setStats(calculatedStats);
    setShowResult(true);
  };

  const handleReset = () => {
    setName("");
    setStats(null);
    setShowResult(false);
    setCopied(false);
  };

  const handleShare = () => {
    if (!stats) return;
    const url = window.location.href;
    const text = `俺の戦闘力は${stats.total.toLocaleString()}だった！ ${url}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rank = stats ? calculateRank(stats.total) : "F";
  const rankColor = getRankColor(rank);
  const rankComment = getRankComment(rank);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <a href="/" className="text-sm text-gray-400 hover:text-white">
            ← Back to Cody Labs
          </a>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            名前の戦闘力
          </h1>
          <p className="mt-2 text-gray-400">
            あなたの名前から戦闘力を測定します
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {!showResult ? (
          /* Input Form */
          <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mb-4 text-6xl">⚡</div>
                <h2 className="mb-2 text-2xl font-bold">名前を入力してください</h2>
                <p className="text-gray-400">日本語でも英語でもOK</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: 太郎 / Taro"
                  className="w-full rounded-lg bg-gray-900 px-6 py-4 text-center text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`w-full rounded-lg px-6 py-4 text-xl font-bold transition ${
                    name.trim()
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                      : "cursor-not-allowed bg-gray-700 text-gray-500"
                  }`}
                >
                  戦闘力を測定する
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-8">
            {/* Total Power Level */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
              <div className="relative">
                <div className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
                  総合戦闘力
                </div>
                <div
                  className={`mb-4 bg-gradient-to-r ${rankColor} bg-clip-text text-7xl font-black text-transparent md:text-8xl`}
                  style={{
                    fontFamily: "Impact, Arial Black, sans-serif",
                    textShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
                  }}
                >
                  {stats?.total.toLocaleString()}
                </div>
                <div
                  className={`inline-block rounded-full bg-gradient-to-r ${rankColor} px-6 py-2 text-3xl font-black`}
                >
                  {rank}ランク
                </div>
                <div className="mt-4 text-xl text-gray-300">{rankComment}</div>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="space-y-4 rounded-2xl bg-gray-900 p-8">
              <h3 className="mb-6 text-center text-2xl font-bold">能力値</h3>

              {/* Attack */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-red-400">⚔️ 攻撃力</span>
                  <span className="font-bold">{stats?.attack.toLocaleString()}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000"
                    style={{ width: `${((stats?.attack || 0) / 9999) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Defense */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-blue-400">🛡️ 防御力</span>
                  <span className="font-bold">{stats?.defense.toLocaleString()}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
                    style={{ width: `${((stats?.defense || 0) / 9999) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Speed */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-green-400">⚡ 素早さ</span>
                  <span className="font-bold">{stats?.speed.toLocaleString()}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000"
                    style={{ width: `${((stats?.speed || 0) / 9999) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Luck */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-yellow-400">🍀 運の良さ</span>
                  <span className="font-bold">{stats?.luck.toLocaleString()}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000"
                    style={{ width: `${((stats?.luck || 0) / 9999) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Charisma */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-purple-400">✨ カリスマ</span>
                  <span className="font-bold">{stats?.charisma.toLocaleString()}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-gray-800">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-1000"
                    style={{ width: `${((stats?.charisma || 0) / 9999) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleShare}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 font-bold transition hover:from-blue-500 hover:to-cyan-500"
              >
                {copied ? "✓ コピーしました！" : "📤 シェアする"}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-lg border-2 border-gray-700 bg-gray-800 px-6 py-4 font-bold transition hover:border-gray-600 hover:bg-gray-700"
              >
                🔄 もう一度
              </button>
            </div>

            {/* Powered by */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500">
                Powered by{" "}
                <a href="/" className="text-blue-500 hover:underline">
                  Cody Labs
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Explanation */}
        {!showResult && (
          <div className="mt-16 rounded-lg bg-gray-900 p-6 text-center text-sm text-gray-400">
            <p className="mb-2">
              ※ 同じ名前からは常に同じ戦闘力が計算されます
            </p>
            <p>※ あなたのデータは一切保存されません</p>
          </div>
        )}
      </div>
    </main>
  );
}
