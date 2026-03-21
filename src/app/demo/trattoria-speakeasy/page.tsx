"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  {
    title: "前菜 — アンティパスト",
    description:
      "季節野菜のバーニャカウダ、自家製リエット、鮮魚のカルパッチョ。化学調味料を使わず、素材そのものの味わいを大切に。",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&h=400&fit=crop",
  },
  {
    title: "パスタ",
    description:
      "手打ちパッパルデッレ、自家製ニョッキ、季節のリゾット。小麦の香りが立つ、丁寧に仕込んだ一皿。",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop",
  },
  {
    title: "メイン — セコンド",
    description:
      "低温調理の豚肩ロース、鮮魚のアクアパッツァ、鶏もものコンフィ。火入れにこだわった本格的な一皿。",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
  },
  {
    title: "ドルチェ",
    description:
      "自家製パンナコッタ、ティラミス、季節のソルベ。食後のひとときを締めくくる手作りデザート。",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop",
  },
  {
    title: "ワインリスト",
    description:
      "イタリア各地の自然派ワインを中心に、お料理に寄り添う一杯をご提案。グラスでもボトルでもどうぞ。",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop",
  },
  {
    title: "おまかせコース",
    description:
      "シェフのおまかせコース（¥5,000〜）。その日の仕入れで構成する、一期一会のディナー。要予約。",
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

export default function SpeakeasyPage() {
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+JP:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-noto { font-family: 'Noto Serif JP', serif; }
      `}</style>

      <main className="font-noto min-h-screen bg-[#0F1A14] text-[#E8E0D4]">
        {/* ═══════ Hero ═══════ */}
        <section className="relative min-h-screen overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1800&h=1000&fit=crop&q=85"
            alt="薄暗い照明の落ち着いたバー空間"
            fill
            className="object-cover scale-105"
            style={{ transition: "transform 12s ease-out", transform: heroLoaded ? "scale(1)" : "scale(1.08)" }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A14]/95 via-[#0F1A14]/60 to-[#0F1A14]/15" />

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-20 sm:px-8 lg:px-12" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            <span
              className="inline-flex w-fit items-center border border-[#B8976A]/30 bg-[#B8976A]/5 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B8976A] backdrop-blur-md"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(20px)", transition: "all 1s cubic-bezier(0.22,1,0.36,1) 0.3s" }}
            >
              西荻窪の路地裏に佇む隠れ家
            </span>

            <h1
              className="font-playfair mt-6 text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.05] text-[#E8E0D4]"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 1.2s cubic-bezier(0.22,1,0.36,1) 0.5s" }}
            >
              Trattoria
              <span className="block font-semibold italic text-[#B8976A]">SPEAKEASY</span>
            </h1>

            <p
              className="mt-5 text-[15px] font-light tracking-[0.2em] text-[#8A9B8E] sm:text-base"
              style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 0.9s" }}
            >
              化学調味料不使用の、素材を活かしたイタリアン
            </p>

            <p
              className="mt-6 max-w-md text-[15px] leading-[1.9] text-[#7A8B7E] sm:text-base"
              style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}
            >
              西荻窪駅南口から路地を入った先に、ひっそりと灯る小さなトラットリア。
              15席だけの空間で、素材と向き合った料理とワインをお楽しみください。
            </p>

            <div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(16px)", transition: "all 1s ease 1.3s" }}
            >
              <a
                href="tel:+81359415796"
                className="inline-flex items-center justify-center rounded bg-[#B8976A] px-9 py-4 text-[13px] font-semibold tracking-wider text-[#0F1A14] shadow-[0_14px_40px_rgba(184,151,106,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CAAB7E] hover:shadow-[0_18px_50px_rgba(184,151,106,0.3)]"
              >
                ご予約はお電話で
              </a>
              <a
                href="#access"
                className="inline-flex items-center justify-center rounded border border-[#E8E0D4]/20 px-9 py-4 text-[13px] font-medium tracking-wider text-[#E8E0D4]/70 transition-all duration-300 hover:border-[#E8E0D4]/40 hover:text-[#E8E0D4]"
              >
                アクセス
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ opacity: heroLoaded ? 0.5 : 0, transition: "opacity 1.5s ease 2s" }}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8E0D4]/30">Scroll</span>
              <div className="h-10 w-[1px] bg-gradient-to-b from-[#E8E0D4]/30 to-transparent animate-pulse" />
            </div>
          </div>
        </section>

        {/* ═══════ Feature highlights ═══════ */}
        <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
          <div className="grid gap-12 sm:grid-cols-3">
            {[
              { src: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=300&fit=crop", title: "化学調味料不使用", desc: "素材の持つ力を信じて。添加物に頼らない、正直な料理をお届けします。" },
              { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=300&fit=crop", title: "15席の隠れ家空間", desc: "路地裏の小さなビル1階。喧騒から離れた、大人のための静かな時間。" },
              { src: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=300&fit=crop", title: "自然派ワイン", desc: "料理に寄り添うイタリアの自然派ワインを中心に、厳選したラインナップ。" },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.15}>
                <div className="group overflow-hidden bg-[#162018] transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={f.src} alt={f.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="px-2 py-6">
                    <p className="font-semibold text-[15px] text-[#B8976A]">{f.title}</p>
                    <p className="mt-2 text-[13px] leading-[2] text-[#8A9B8E]">{f.desc}</p>
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
              <div className="overflow-hidden bg-[#162018]">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&h=400&fit=crop"
                    alt="落ち着いた店内でワインを楽しむ"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B8976A]">お店について</p>
                  <h2 className="font-playfair mt-4 text-3xl font-light text-[#E8E0D4] sm:text-4xl">
                    知る人ぞ知る、<br className="hidden sm:inline" />路地裏の小さなトラットリア。
                  </h2>
                  <p className="mt-6 text-[15px] leading-[2] text-[#8A9B8E]">
                    「Speakeasy」—— かつてアメリカの禁酒法時代に、
                    お酒を密かに楽しむために作られた隠れ家。
                    その名の通り、西荻窪の路地裏にひっそりと佇む
                    15席だけの小さなレストランです。
                  </p>
                  <p className="mt-4 text-[15px] leading-[2] text-[#8A9B8E]">
                    化学調味料に頼らず、素材の味を丁寧に引き出す料理と、
                    それに寄り添うワイン。静かな夜に、大切な人と過ごす
                    特別な時間をお届けします。
                  </p>
                </div>
              </div>

              <div className="bg-[#1A2B1E] p-8 text-[#E8E0D4] sm:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B8976A]">お店の情報</p>
                <dl className="mt-8 space-y-7">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#6B7D6F]">電話番号</dt>
                    <dd className="font-playfair mt-2 text-2xl font-semibold tracking-wide text-[#B8976A]">03-5941-5796</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#6B7D6F]">住所</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-[#A0B0A4]">
                      東京都杉並区西荻南3-8-10<br />中根ビル 1F
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#6B7D6F]">営業時間</dt>
                    <dd className="mt-2 space-y-1 text-[15px] leading-7 text-[#A0B0A4]">
                      <p>月火木金 17:30 – 23:30 <span className="text-[#6B7D6F]">(L.O. 22:30)</span></p>
                      <p>土日祝 17:00 – 23:30 <span className="text-[#6B7D6F]">(L.O. 22:30)</span></p>
                      <p>定休日: 水曜</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-[#6B7D6F]">席数</dt>
                    <dd className="mt-2 text-[15px] leading-7 text-[#A0B0A4]">テーブル12席 / カウンター3席</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Quote — fullbleed parallax break ═══════ */}
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
            <div className="absolute inset-0 bg-[#0F1A14]/80" />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mx-auto max-w-2xl">
                <p className="font-playfair text-3xl italic leading-relaxed text-[#E8E0D4]/90 sm:text-4xl lg:text-5xl">
                  「静かに語る、<br />素材の声に耳を傾けて。」
                </p>
                <div className="mx-auto mt-8 h-[1px] w-12 bg-[#B8976A]" />
                <p className="mt-6 text-sm tracking-[0.3em] text-[#8A9B8E]">
                  Trattoria SPEAKEASY
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Menu ═══════ */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B8976A]">メニュー</p>
              <h2 className="font-playfair mt-4 text-3xl font-light text-[#E8E0D4] sm:text-4xl">
                素材と、季節と、ワインと。
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B7D6F]">
                季節ごとにメニューが変わります。詳しくはお電話でお問い合わせください。
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <article className="group overflow-hidden bg-[#162018] transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-2 py-6">
                    <h3 className="text-[15px] font-semibold text-[#E8E0D4]">{item.title}</h3>
                    <p className="mt-3 text-[13px] leading-[2] text-[#8A9B8E]">{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════ Fullbleed photo break ═══════ */}
        <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=600&fit=crop&q=85"
            alt="美しく盛り付けられた料理"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A14]/50 to-transparent" />
        </section>

        {/* ═══════ Access & Map ═══════ */}
        <Reveal>
          <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="access">
              <div className="bg-[#1A2B1E] p-8 sm:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#B8976A]">アクセス</p>
                <h2 className="font-playfair mt-4 text-3xl font-light text-[#E8E0D4] sm:text-4xl">
                  西荻窪駅から徒歩1分。
                </h2>
                <div className="mt-8 space-y-6 text-[#A0B0A4]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8976A]">住所</p>
                    <p className="mt-2 text-base leading-8">東京都杉並区西荻南3-8-10<br />中根ビル 1F</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8976A]">最寄り駅</p>
                    <p className="mt-2 text-base leading-8">JR中央線・総武線 西荻窪駅<br />南口より徒歩1分（みずほ銀行脇の路地入る）</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8976A]">営業時間</p>
                    <div className="mt-2 space-y-1 text-base leading-8">
                      <p>月火木金 17:30 – 23:30</p>
                      <p>土日祝 17:00 – 23:30</p>
                      <p>定休日: 水曜</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8976A]">お支払い</p>
                    <p className="mt-2 text-base leading-8">カード可（各種）/ 電子マネー可<br />QRコード決済可（PayPay他）</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden bg-[#162018]">
                <iframe
                  title="Trattoria SPEAKEASYへの地図"
                  src="https://www.google.com/maps?q=東京都杉並区西荻南3-8-10&z=17&output=embed"
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
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&h=500&fit=crop"
                alt="バーカウンターの温かい光"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0F1A14]/85" />
              <div className="relative mx-auto max-w-2xl px-8 py-20 text-center text-[#E8E0D4] sm:py-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#B8976A]">ご予約・お問い合わせ</p>
                <h2 className="font-playfair mt-5 text-3xl font-light sm:text-4xl lg:text-5xl">
                  今夜、<br />秘密の扉を開けてみませんか。
                </h2>
                <p className="mt-6 text-[15px] leading-[2] text-[#8A9B8E]">
                  お電話一本でご予約いただけます。<br />
                  記念日のご相談や、おまかせコースのご要望もお気軽にどうぞ。
                </p>
                <a
                  href="tel:+81359415796"
                  className="mt-10 inline-flex min-h-14 items-center justify-center rounded bg-[#B8976A] px-10 py-4 text-[13px] font-semibold tracking-wider text-[#0F1A14] shadow-[0_14px_40px_rgba(184,151,106,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#CAAB7E] hover:shadow-[0_18px_50px_rgba(184,151,106,0.3)]"
                >
                  03-5941-5796 に電話する
                </a>
                <p className="mt-5 text-xs tracking-[0.2em] text-[#6B7D6F]">
                  月火木金 17:30– / 土日祝 17:00– / 水曜定休
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ═══════ Footer ═══════ */}
        <footer className="px-6 pb-12 pt-20 text-center sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-6 h-[1px] w-16 bg-[#2A3D2E]" />
            <p className="font-playfair text-lg italic text-[#6B7D6F]">Trattoria SPEAKEASY</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-[#4A5D4E]">
              Website by Cody Labs · cody-labs-site.vercel.app
            </p>
          </div>
        </footer>
      </main>

      {/* ═══════ Floating reservation button ═══════ */}
      <a
        href="tel:+81359415796"
        aria-label="電話で予約する"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-lg bg-[#B8976A] shadow-[0_8px_24px_rgba(184,151,106,0.3)] transition-all duration-500 hover:scale-110 hover:shadow-[0_12px_32px_rgba(184,151,106,0.4)]"
        style={{
          opacity: showFloat ? 1 : 0,
          transform: showFloat ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
          pointerEvents: showFloat ? "auto" : "none",
          transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F1A14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
    </>
  );
}
