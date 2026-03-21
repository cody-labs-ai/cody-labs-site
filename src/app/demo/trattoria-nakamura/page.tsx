"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  {
    title: "前菜 — アンティパスト",
    description:
      "自家製バーニャカウダ、季節野菜のカポナータ、生ハムと旬のフルーツなど。素材の味を活かしたイタリアの前菜をお楽しみください。",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&h=400&fit=crop",
  },
  {
    title: "パスタ",
    description:
      "自家製の手打ちパスタを毎朝仕込んでいます。定番のカルボナーラ、ボロネーゼから季節限定パスタまで。",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
  },
  {
    title: "メイン — セコンドピアット",
    description:
      "じっくり焼き上げた仔羊のロースト、鮮魚のアクアパッツァ、鶏もも肉のカチャトーラなど本格的なメインディッシュ。",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  },
  {
    title: "ドルチェ",
    description:
      "自家製ティラミス、パンナコッタ、季節のジェラートなど。食後のひとときを締めくくる手作りデザート。",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
  },
  {
    title: "ワイン & ドリンク",
    description:
      "イタリア各地から厳選したワインをグラスでもボトルでも。お料理に合わせたペアリングもご相談ください。",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
  },
  {
    title: "コース料理",
    description:
      "シェフおまかせコース（¥5,500〜）。記念日や特別な日に、旬の食材を使った特別な一皿をお届けします。",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
  },
];

/* ── Intersection Observer hook for scroll animations ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function TrattoriaNakamuraPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    setHeroLoaded(true);
    const onScroll = () => setShowFloat(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-noto { font-family: 'Noto Serif JP', serif; }
      `}</style>

      <main className="font-noto min-h-screen bg-[#F5F0EB] text-[#2c2418]">
        {/* ═══════ Hero ═══════ */}
        <section className="relative min-h-screen overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&h=1000&fit=crop&q=85"
            alt="温かみのあるレストラン店内"
            fill
            className="object-cover scale-105"
            style={{ transition: "transform 12s ease-out", transform: heroLoaded ? "scale(1)" : "scale(1.08)" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0804]/95 via-[#0d0804]/60 to-[#0d0804]/15" />

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-20 sm:px-8 lg:px-12" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            <span
              className="inline-flex w-fit items-center border border-white/15 bg-white/5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4a86a] backdrop-blur-md"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.3s" }}
            >
              東京・西荻窪の隠れ家イタリアン
            </span>

            <h1
              className="font-cormorant mt-6 text-[clamp(3rem,8vw,6rem)] font-light leading-[1.05] text-white"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              Trattoria
              <span className="block font-semibold italic text-[#d4a86a]">Nakamura</span>
            </h1>

            <p
              className="mt-5 text-[15px] font-light tracking-[0.2em] text-[#b8a890] sm:text-base"
              style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 0.9s" }}
            >
              手打ちパスタと旬のイタリア料理
            </p>

            <p
              className="mt-6 max-w-md text-[15px] leading-[1.9] text-[#a89880] sm:text-base"
              style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}
            >
              西荻窪の路地裏にひっそり佇む15席の小さなトラットリア。
              毎朝仕込む自家製パスタと、旬の食材で心のこもった一皿をお届けします。
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(16px)", transition: "all 1s ease 1.3s" }}
            >
              <a
                href="tel:+81312345678"
                className="inline-flex items-center justify-center rounded bg-[#d4a86a] px-9 py-4 text-[13px] font-semibold tracking-wider text-[#1a1008] shadow-[0_14px_40px_rgba(212,168,106,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0b87a] hover:shadow-[0_18px_50px_rgba(212,168,106,0.35)]"
              >
                ご予約はお電話で
              </a>
              <a
                href="#access"
                className="inline-flex items-center justify-center rounded border border-white/20 px-9 py-4 text-[13px] font-medium tracking-wider text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                アクセス
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ opacity: heroLoaded ? 0.5 : 0, transition: "opacity 1.5s ease 2s" }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
              <div className="h-10 w-[1px] bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
            </div>
          </div>
        </section>

        {/* ═══════ Feature highlights ═══════ */}
        <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              { src: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&h=300&fit=crop", title: "毎朝手打ちパスタ", desc: "生地から毎日手作り。もちもちの食感と小麦の香りをお楽しみください。" },
              { src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=300&fit=crop", title: "旬の食材へのこだわり", desc: "市場で選んだ魚介、契約農家の野菜。素材の力を引き出す料理を。" },
              { src: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=300&fit=crop", title: "厳選イタリアワイン", desc: "トスカーナ、ピエモンテ、シチリアなど各地のワインをお料理に合わせて。" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.15}>
                <div className="group overflow-hidden bg-[#FAF6F1] transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={f.src} alt={f.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="px-2 py-6">
                    <p className="font-semibold text-[15px] text-[#8b6234]">{f.title}</p>
                    <p className="mt-2 text-[13px] leading-[2] text-[#5a4a38]">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════ About + Details ═══════ */}
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="overflow-hidden bg-[#FAF6F1] shadow-none">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop"
                    alt="シェフが丁寧に料理を仕上げる"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8b6234]">お店について</p>
                  <h2 className="font-cormorant mt-4 text-3xl font-light text-[#2c2418] sm:text-4xl">
                    「いつもの一皿」が見つかる、<br className="hidden sm:inline" />あなたの街のトラットリア。
                  </h2>
                  <p className="mt-6 text-[15px] leading-[2] text-[#5a4a38]">
                    トラットリア・ナカムラは、オーナーシェフの中村が
                    イタリア修行で学んだ郷土料理の温かさを、
                    西荻窪の小さなお店でお届けしています。
                  </p>
                  <p className="mt-4 text-[15px] leading-[2] text-[#5a4a38]">
                    派手さはありませんが、丁寧に仕込んだ手打ちパスタ、
                    豊洲で仕入れた魚介、契約農家の野菜を使った
                    正直なイタリア料理を大切にしています。
                  </p>
                </div>
              </div>

              <div className="bg-[#2c2418] p-8 text-[#f8f1e8] sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d4a86a]">お店の情報</p>
                <dl className="mt-8 space-y-7">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#a08a6c]">電話番号</dt>
                    <dd className="font-cormorant mt-2 text-2xl font-semibold tracking-wide">03-1234-5678</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#a08a6c]">住所</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-[#efe3d2]">
                      〒167-0042<br />東京都杉並区西荻北3-12-8 2F
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#a08a6c]">営業時間</dt>
                    <dd className="mt-2 space-y-1 text-[15px] leading-7 text-[#efe3d2]">
                      <p>ランチ 11:30 – 14:00 <span className="text-[#a08a6c]">(L.O. 13:30)</span></p>
                      <p>ディナー 18:00 – 22:00 <span className="text-[#a08a6c]">(L.O. 21:00)</span></p>
                      <p>定休日: 月曜・第3火曜</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#a08a6c]">席数</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-[#efe3d2]">カウンター4席 / テーブル11席</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Chef quote — fullbleed parallax break ═══════ */}
        <Reveal>
          <section className="relative my-20 h-[50vh] min-h-[400px] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=1600&h=800&fit=crop&q=85')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
            />
            <div className="absolute inset-0 bg-[#0d0804]/70" />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mx-auto max-w-2xl">
                <p className="font-cormorant text-3xl italic leading-relaxed text-white/90 sm:text-4xl lg:text-5xl">
                  「素材と向き合い、<br />一皿一皿に想いを込めて。」
                </p>
                <div className="mx-auto mt-8 h-[1px] w-12 bg-[#d4a86a]" />
                <p className="mt-6 text-sm tracking-[0.3em] text-[#c8ad88]">
                  オーナーシェフ&ensp;中村
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Menu ═══════ */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8b6234]">メニュー</p>
              <h2 className="font-cormorant mt-4 text-3xl font-light text-[#2c2418] sm:text-4xl">
                旬を味わう、シンプルなイタリア料理。
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6a5842]">
                季節ごとにメニューが変わります。詳しくはお電話でお問い合わせください。
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <article className="group overflow-hidden bg-[#FAF6F1] transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-2 py-6">
                    <h3 className="text-[15px] font-semibold text-[#2c2418]">{item.title}</h3>
                    <p className="mt-3 text-[13px] leading-[2] text-[#5a4a38]">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════ Fullbleed food photo break ═══════ */}
        <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=600&fit=crop&q=85"
            alt="美しく盛り付けられた料理"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0804]/30 to-transparent" />
        </section>

        {/* ═══════ Access & Map ═══════ */}
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="access">
              <div className="bg-[#EDE6DB] p-8 sm:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#8b6234]">アクセス</p>
                <h2 className="font-cormorant mt-4 text-3xl font-light text-[#2c2418] sm:text-4xl">
                  西荻窪駅から徒歩3分。
                </h2>
                <div className="mt-8 space-y-6 text-[#5a4a38]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b6234]">住所</p>
                    <p className="mt-2 text-base leading-8">東京都杉並区西荻北3-12-8 2F</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b6234]">最寄り駅</p>
                    <p className="mt-2 text-base leading-8">JR中央線・総武線 西荻窪駅 北口より徒歩3分</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b6234]">営業時間</p>
                    <div className="mt-2 space-y-1 text-base leading-8">
                      <p>ランチ 11:30 – 14:00</p>
                      <p>ディナー 18:00 – 22:00</p>
                      <p>定休日: 月曜・第3火曜</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden bg-[#FAF6F1]">
                <iframe
                  title="トラットリア・ナカムラへの地図"
                  src="https://www.google.com/maps?q=西荻窪駅&z=16&output=embed"
                  className="h-[420px] w-full border-0 sm:h-[520px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ CTA ═══════ */}
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-12">
            <div className="relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&h=500&fit=crop"
                alt="テーブルに並ぶイタリア料理"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0d0804]/80" />
              <div className="relative mx-auto max-w-2xl px-8 py-20 text-center text-[#faf4ec] sm:py-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d4a86a]">ご予約・お問い合わせ</p>
                <h2 className="font-cormorant mt-5 text-3xl font-light sm:text-4xl lg:text-5xl">
                  今夜のディナー、<br />ご一緒しませんか。
                </h2>
                <p className="mt-6 text-[15px] leading-[2] text-[#c8b8a0]">
                  お電話一本でご予約いただけます。<br />
                  記念日のご相談や、おまかせコースのご要望もお気軽にどうぞ。
                </p>
                <a
                  href="tel:+81312345678"
                  className="mt-10 inline-flex min-h-14 items-center justify-center rounded bg-[#d4a86a] px-10 py-4 text-[13px] font-semibold tracking-wider text-[#1a1008] shadow-[0_14px_40px_rgba(212,168,106,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0b87a] hover:shadow-[0_18px_50px_rgba(212,168,106,0.4)]"
                >
                  03-1234-5678 に電話する
                </a>
                <p className="mt-5 text-xs tracking-[0.2em] text-[#a08a6c]">
                  ランチ 11:30–14:00 / ディナー 18:00–22:00 / 月曜・第3火曜定休
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Footer ═══════ */}
        <footer className="px-6 pb-12 pt-20 text-center sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-6 h-[1px] w-16 bg-[#d4c0a4]" />
            <p className="font-cormorant text-lg italic text-[#a08a6c]">Trattoria Nakamura</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#b0a08c]">
              Website by Cody Labs · cody-labs-site.vercel.app
            </p>
          </div>
        </footer>
      </main>

      {/* ═══════ Floating reservation button ═══════ */}
      <a
        href="tel:+81312345678"
        aria-label="電話で予約する"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-[#d4a86a] shadow-[0_8px_24px_rgba(212,168,106,0.4)] transition-all duration-500 hover:scale-110 hover:shadow-[0_12px_32px_rgba(212,168,106,0.5)]"
        style={{
          opacity: showFloat ? 1 : 0,
          transform: showFloat ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
          pointerEvents: showFloat ? "auto" : "none",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1008" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
