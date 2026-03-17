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

// Special abilities list
const SPECIAL_ABILITIES = [
  "時間停止",
  "相手の技をコピーする",
  "死んでも1回だけ復活",
  "半径100mの読心術",
  "触れたものを金に変える",
  "影と入れ替わる",
  "1日1回だけ未来が見える",
  "食べたものの能力を得る",
  "寝てる間に分身が働く",
  "Wi-Fiがない場所でもネットに繋がる",
  "じゃんけんに絶対勝つ",
  "全言語を話せるが敬語だけ使えない",
];

// Weaknesses list
const WEAKNESSES = [
  "月曜日だけ戦闘力が半分",
  "猫を見ると戦闘意欲が消える",
  "辛い食べ物を食べると3分間無力化",
  "褒められると照れて能力が使えない",
  "雨の日はやる気ゼロ",
  "WiFiが弱いと力が出ない",
  "早起きすると全ステータス-50%",
  "推しの話になると戦闘を忘れる",
];

// Titles list
const TITLES = [
  "漆黒の",
  "覚醒せし",
  "最後の",
  "伝説の",
  "禁忌の",
  "深淵の",
  "黄昏の",
  "不滅の",
  "混沌の",
  "天上天下唯我独尊の",
];

// Past lives examples
const PAST_LIFE_PLACES = [
  "エジプト",
  "ローマ",
  "江戸時代",
  "未来",
  "平安時代",
  "戦国時代",
  "古代ギリシャ",
  "バイキング時代",
  "中世ヨーロッパ",
  "古代中国",
  "マヤ文明",
  "アトランティス",
];

const PAST_LIFE_ROLES = [
  "猫",
  "剣闘士",
  "寿司職人",
  "AIエージェント",
  "巫女",
  "忍者",
  "哲学者",
  "戦士",
  "錬金術師",
  "皇帝",
  "神官",
  "商人",
  "吟遊詩人",
  "龍",
];

// Partner names pool
const PARTNER_NAME_PARTS = [
  "アルティメット",
  "サンダー",
  "ダーク",
  "ホーリー",
  "フレイム",
  "アイス",
  "シャドウ",
  "ライト",
  "デス",
  "エンジェル",
  "デビル",
  "ドラゴン",
  "フェニックス",
  "キング",
  "クイーン",
];

const PARTNER_NAME_SUFFIXES = [
  "ゼロ",
  "マスター",
  "ナイト",
  "ウィザード",
  "ハンター",
  "ブレイド",
  "ソウル",
  "ハート",
  "ウィング",
  "クロウ",
  "フォース",
  "エクス",
];

type Stats = {
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  charisma: number;
  luck: number;
  total: number;
  specialAbility: string;
  weakness: string;
  title: string;
  partnerName: string;
  partnerPower: number;
  pastLifePlace: string;
  pastLifeRole: string;
};

export default function NamePowerPage() {
  const [name, setName] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const trimmedName = name.trim();
    
    // Generate all stats (1-99999)
    const attack = generateStat(trimmedName, 1, 1, 99999);
    const defense = generateStat(trimmedName, 2, 1, 99999);
    const speed = generateStat(trimmedName, 3, 1, 99999);
    const intelligence = generateStat(trimmedName, 4, 1, 99999);
    const charisma = generateStat(trimmedName, 5, 1, 99999);
    const luck = generateStat(trimmedName, 6, 1, 99999);
    
    // Pick special ability
    const abilityIndex = generateStat(trimmedName, 7, 0, SPECIAL_ABILITIES.length - 1);
    const specialAbility = SPECIAL_ABILITIES[abilityIndex];
    
    // Pick weakness
    const weaknessIndex = generateStat(trimmedName, 8, 0, WEAKNESSES.length - 1);
    const weakness = WEAKNESSES[weaknessIndex];
    
    // Pick title
    const titleIndex = generateStat(trimmedName, 9, 0, TITLES.length - 1);
    const title = TITLES[titleIndex];
    
    // Generate partner
    const partnerPart = generateStat(trimmedName, 10, 0, PARTNER_NAME_PARTS.length - 1);
    const partnerSuffix = generateStat(trimmedName, 11, 0, PARTNER_NAME_SUFFIXES.length - 1);
    const partnerName = PARTNER_NAME_PARTS[partnerPart] + PARTNER_NAME_SUFFIXES[partnerSuffix];
    const partnerPower = generateStat(trimmedName, 12, 10000, 99999);
    
    // Generate past life
    const pastLifePlaceIndex = generateStat(trimmedName, 13, 0, PAST_LIFE_PLACES.length - 1);
    const pastLifeRoleIndex = generateStat(trimmedName, 14, 0, PAST_LIFE_ROLES.length - 1);
    const pastLifePlace = PAST_LIFE_PLACES[pastLifePlaceIndex];
    const pastLifeRole = PAST_LIFE_ROLES[pastLifeRoleIndex];

    const calculatedStats: Stats = {
      attack,
      defense,
      speed,
      intelligence,
      charisma,
      luck,
      total: attack + defense + speed + intelligence + charisma + luck,
      specialAbility,
      weakness,
      title,
      partnerName,
      partnerPower,
      pastLifePlace,
      pastLifeRole,
    };

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
    const text = `【名前の戦闘力】\n二つ名：${stats.title}${name}\n総合戦闘力：${stats.total.toLocaleString()}\n特殊能力：${stats.specialAbility}\n弱点：${stats.weakness}\n\n${url}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0015] via-[#1a0a2e] to-[#0a0015] text-white">
      {/* Animated background stars */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute h-1 w-1 animate-pulse rounded-full bg-purple-400" style={{ top: "10%", left: "20%" }}></div>
        <div className="absolute h-1 w-1 animate-pulse rounded-full bg-cyan-400" style={{ top: "30%", left: "70%", animationDelay: "0.5s" }}></div>
        <div className="absolute h-1 w-1 animate-pulse rounded-full bg-pink-400" style={{ top: "60%", left: "40%", animationDelay: "1s" }}></div>
        <div className="absolute h-1 w-1 animate-pulse rounded-full bg-yellow-400" style={{ top: "80%", left: "80%", animationDelay: "1.5s" }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-purple-900/50 px-6 py-6">
        <div className="mx-auto max-w-4xl">
          <a href="/" className="text-sm text-gray-400 hover:text-purple-400 transition">
            ← Back to Cody Labs
          </a>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            名前の戦闘力
          </h1>
          <p className="mt-2 text-gray-400">
            あなたの隠された真の力を解放せよ...
          </p>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-6 py-12">
        {!showResult ? (
          /* Input Form */
          <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mb-4 text-6xl animate-pulse">⚡</div>
                <h2 className="mb-2 text-2xl font-bold">名前を入力せよ</h2>
                <p className="text-gray-400">日本語でも英語でもOK</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="例: 太郎 / Taro"
                  className="w-full rounded-lg border-2 border-purple-500/50 bg-gray-900/80 px-6 py-4 text-center text-2xl font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`w-full rounded-lg px-6 py-4 text-xl font-bold transition transform ${
                    name.trim()
                      ? "bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 hover:scale-105 shadow-lg shadow-purple-500/50"
                      : "cursor-not-allowed bg-gray-700 text-gray-500"
                  }`}
                >
                  真の力を解放する
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Results - RPG Card Style */
          <div className="space-y-6">
            {/* Title Card with dramatic effect */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-gray-900 via-purple-900/30 to-black p-1 shadow-2xl shadow-purple-500/50">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-pulse"></div>
              <div className="relative rounded-xl bg-black/80 backdrop-blur-sm p-8 text-center">
                <div className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow-400">
                  ★★★ LEGENDARY CHARACTER ★★★
                </div>
                <div className="mb-2 text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
                  {stats?.title}{name}
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  前世は{stats?.pastLifePlace}の{stats?.pastLifeRole}
                </div>
              </div>
            </div>

            {/* Total Power */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-gray-900 to-black p-8 text-center shadow-2xl shadow-cyan-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
              <div className="relative">
                <div className="mb-2 text-sm font-medium uppercase tracking-widest text-cyan-400">
                  ═══ Total Combat Power ═══
                </div>
                <div
                  className="mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-8xl font-black text-transparent animate-pulse"
                  style={{
                    fontFamily: "Impact, Arial Black, sans-serif",
                    textShadow: "0 0 40px rgba(139, 92, 246, 0.6)",
                  }}
                >
                  {stats?.total.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Stats Grid - RPG Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4 rounded-2xl border-2 border-red-500/30 bg-gray-900/80 backdrop-blur-sm p-6">
                <h3 className="text-center text-xl font-bold text-red-400 border-b border-red-500/30 pb-2">⚔️ 基本ステータス</h3>

                {/* Attack */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-red-400">攻撃力</span>
                    <span className="font-mono font-bold text-white">{stats?.attack.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-red-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-lg shadow-red-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.attack || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Defense */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-blue-400">防御力</span>
                    <span className="font-mono font-bold text-white">{stats?.defense.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-blue-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg shadow-blue-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.defense || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Speed */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-green-400">素早さ</span>
                    <span className="font-mono font-bold text-white">{stats?.speed.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-green-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 shadow-lg shadow-green-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.speed || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Intelligence */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-purple-400">知力</span>
                    <span className="font-mono font-bold text-white">{stats?.intelligence.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-purple-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg shadow-purple-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.intelligence || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Charisma */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-pink-400">カリスマ</span>
                    <span className="font-mono font-bold text-white">{stats?.charisma.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-pink-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-pink-600 to-pink-400 shadow-lg shadow-pink-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.charisma || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Luck */}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-bold text-yellow-400">運</span>
                    <span className="font-mono font-bold text-white">{stats?.luck.toLocaleString()}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-800 border border-yellow-900/50">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-lg shadow-yellow-500/50 transition-all duration-1000"
                      style={{ width: `${((stats?.luck || 0) / 99999) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Right Column - Special Info */}
              <div className="space-y-4">
                {/* Special Ability */}
                <div className="rounded-2xl border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-black p-6 shadow-xl shadow-yellow-500/20">
                  <div className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-yellow-400">
                    ✨ Hidden Special Ability ✨
                  </div>
                  <div className="text-center text-2xl font-black text-white">
                    {stats?.specialAbility}
                  </div>
                </div>

                {/* Weakness */}
                <div className="rounded-2xl border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black p-6 shadow-xl shadow-purple-500/20">
                  <div className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-purple-400">
                    ⚠️ Weakness ⚠️
                  </div>
                  <div className="text-center text-lg font-bold text-white">
                    {stats?.weakness}
                  </div>
                </div>

                {/* Compatible Partner */}
                <div className="rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-black p-6 shadow-xl shadow-cyan-500/20">
                  <div className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-cyan-400">
                    🤝 Best Partner 🤝
                  </div>
                  <div className="text-center text-sm text-white">
                    戦闘力<span className="font-mono font-bold text-cyan-400">{stats?.partnerPower.toLocaleString()}</span>の<br />
                    <span className="text-xl font-black text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                      「{stats?.partnerName}」
                    </span><br />
                    <span className="text-xs text-gray-400">と組むと最強</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row mt-8">
              <button
                onClick={handleShare}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 px-6 py-4 font-bold transition hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-500/30 transform hover:scale-105"
              >
                {copied ? "✓ コピーしました！" : "📤 戦闘力をシェアする"}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 rounded-lg border-2 border-purple-700 bg-gray-800 px-6 py-4 font-bold transition hover:border-purple-500 hover:bg-gray-700 transform hover:scale-105"
              >
                🔄 別の名前を試す
              </button>
            </div>

            {/* Footer note */}
            <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
              ※ 同じ名前からは常に同じ結果が生成されます
            </div>
          </div>
        )}

        {/* Explanation */}
        {!showResult && (
          <div className="mt-16 rounded-lg border border-purple-900/50 bg-gray-900/50 backdrop-blur-sm p-6 text-center text-sm text-gray-400">
            <p className="mb-2">
              ※ 名前から超詳細なRPGステータスを生成
            </p>
            <p className="mb-2">※ 同じ名前からは常に同じ結果が出ます</p>
            <p>※ あなたのデータは一切保存されません</p>
          </div>
        )}
      </div>
    </main>
  );
}
