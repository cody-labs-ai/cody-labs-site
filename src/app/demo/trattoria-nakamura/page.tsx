"use client";

import Image from "next/image";

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

export default function TrattoriaNakamuraPage() {
  return (
    <main className="min-h-screen bg-[#faf6f1] text-[#2c2418]">
      {/* Hero with full-bleed image */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=900&fit=crop"
          alt="温かみのあるレストラン店内"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1008]/90 via-[#1a1008]/50 to-[#1a1008]/20" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-6 pb-16 sm:px-8 lg:px-12">
          <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#e8d5b8] backdrop-blur-sm">
            東京・西荻窪の隠れ家イタリアン
          </span>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            トラットリア
            <span className="block text-[#d4a86a]">ナカムラ</span>
          </h1>
          <p className="mt-4 text-lg font-light tracking-[0.1em] text-[#d8c8b0] sm:text-xl">
            手打ちパスタと旬のイタリア料理
          </p>
          <p className="mt-6 max-w-lg text-base leading-8 text-[#c8b8a0] sm:text-lg">
            西荻窪の路地裏にひっそり佇む15席の小さなトラットリア。
            毎朝仕込む自家製パスタと、旬の食材で心のこもった一皿をお届けします。
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="tel:+81312345678"
              className="inline-flex items-center justify-center rounded-full bg-[#d4a86a] px-8 py-4 text-base font-semibold text-[#1a1008] shadow-[0_14px_40px_rgba(212,168,106,0.3)] transition hover:-translate-y-0.5 hover:bg-[#e0b87a]"
            >
              電話で予約する
            </a>
            <a
              href="#access"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              アクセス・営業時間
            </a>
          </div>
        </div>
      </section>

      {/* Feature highlights with images */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(44,36,24,0.08)]">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&h=300&fit=crop"
                alt="手打ちパスタ"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="font-semibold text-[#8b6234]">毎朝手打ちパスタ</p>
              <p className="mt-2 text-sm leading-6 text-[#5a4a38]">生地から毎日手作り。もちもちの食感と小麦の香りをお楽しみください。</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(44,36,24,0.08)]">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&h=300&fit=crop"
                alt="新鮮な旬の食材"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="font-semibold text-[#8b6234]">旬の食材へのこだわり</p>
              <p className="mt-2 text-sm leading-6 text-[#5a4a38]">市場で選んだ魚介、契約農家の野菜。素材の力を引き出す料理を。</p>
            </div>
          </div>
          <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(44,36,24,0.08)]">
            <div className="relative h-48 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&h=300&fit=crop"
                alt="厳選イタリアワイン"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="font-semibold text-[#8b6234]">厳選イタリアワイン</p>
              <p className="mt-2 text-sm leading-6 text-[#5a4a38]">トスカーナ、ピエモンテ、シチリアなど各地のワインをお料理に合わせて。</p>
            </div>
          </div>
        </div>
      </section>

      {/* About + Details */}
      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(100,75,40,0.08)]">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=400&fit=crop"
                alt="シェフが丁寧に料理を仕上げる"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6234]">お店について</p>
              <h2 className="mt-4 font-serif text-3xl text-[#2c2418] sm:text-4xl">
                「いつもの一皿」が見つかる、<br className="hidden sm:inline" />あなたの街のトラットリア。
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5a4a38] sm:text-lg">
                トラットリア・ナカムラは、オーナーシェフの中村が
                イタリア修行で学んだ郷土料理の温かさを、
                西荻窪の小さなお店でお届けしています。
              </p>
              <p className="mt-4 text-base leading-8 text-[#5a4a38] sm:text-lg">
                派手さはありませんが、丁寧に仕込んだ手打ちパスタ、
                豊洲で仕入れた魚介、契約農家の野菜を使った
                正直なイタリア料理を大切にしています。
              </p>
              <p className="mt-4 text-base leading-8 text-[#5a4a38] sm:text-lg">
                常連さんも初めての方も、気軽にお越しください。
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#2c2418] p-8 text-[#f8f1e8] shadow-[0_22px_60px_rgba(44,36,24,0.22)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d4a86a]">お店の情報</p>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#c8ad88]">電話番号</dt>
                <dd className="mt-2 text-xl font-semibold">03-1234-5678</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#c8ad88]">住所</dt>
                <dd className="mt-2 text-base leading-7 text-[#efe3d2]">
                  〒167-0042<br />
                  東京都杉並区西荻北3-12-8 2F
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#c8ad88]">営業時間</dt>
                <dd className="mt-2 space-y-1 text-base leading-7 text-[#efe3d2]">
                  <p>ランチ: 11:30 - 14:00 (L.O. 13:30)</p>
                  <p>ディナー: 18:00 - 22:00 (L.O. 21:00)</p>
                  <p>定休日: 月曜・第3火曜</p>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#c8ad88]">席数</dt>
                <dd className="mt-2 text-base leading-7 text-[#efe3d2]">
                  カウンター4席 / テーブル11席
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Menu with photos */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6234]">メニュー</p>
          <h2 className="mt-4 font-serif text-3xl text-[#2c2418] sm:text-4xl">
            旬を味わう、シンプルなイタリア料理。
          </h2>
          <p className="mt-4 text-base leading-7 text-[#6a5842]">
            季節ごとにメニューが変わります。詳しくはお電話でお問い合わせください。
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {menuItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(44,36,24,0.06)] transition hover:shadow-[0_12px_40px_rgba(44,36,24,0.12)]"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#2c2418]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5a4a38]">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Access & Map */}
      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="access">
          <div className="rounded-[2rem] bg-[#f5ece1] p-8 shadow-[0_20px_60px_rgba(100,75,40,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6234]">アクセス</p>
            <h2 className="mt-4 font-serif text-3xl text-[#2c2418] sm:text-4xl">
              西荻窪駅から徒歩3分。
            </h2>
            <div className="mt-8 space-y-6 text-[#5a4a38]">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b6234]">住所</p>
                <p className="mt-2 text-lg leading-8">
                  東京都杉並区西荻北3-12-8 2F
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b6234]">最寄り駅</p>
                <p className="mt-2 text-lg leading-8">
                  JR中央線・総武線 西荻窪駅 北口より徒歩3分
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b6234]">営業時間</p>
                <div className="mt-2 space-y-1 text-lg leading-8">
                  <p>ランチ: 11:30 - 14:00</p>
                  <p>ディナー: 18:00 - 22:00</p>
                  <p>定休日: 月曜・第3火曜</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8b6234]">ご予約</p>
                <p className="mt-2 text-lg leading-8">
                  お電話にてご予約を承ります。<br />
                  当日のお席についてもお気軽にお問い合わせください。
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#e2d0b8] bg-white shadow-[0_22px_60px_rgba(44,36,24,0.12)]">
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

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(44,36,24,0.20)]">
          <Image
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1200&h=500&fit=crop"
            alt="テーブルに並ぶイタリア料理"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1008]/80" />
          <div className="relative mx-auto max-w-2xl px-8 py-16 text-center text-[#faf4ec] sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d4a86a]">ご予約・お問い合わせ</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              今夜のディナー、ご一緒しませんか。
            </h2>
            <p className="mt-5 text-base leading-8 text-[#ddd0be] sm:text-lg">
              お電話一本でご予約いただけます。<br />
              記念日のご相談や、おまかせコースのご要望もお気軽にどうぞ。
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="tel:+81312345678"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d4a86a] px-8 py-4 text-base font-semibold text-[#1a1008] transition hover:-translate-y-0.5 hover:bg-[#e0b87a]"
              >
                03-1234-5678 に電話する
              </a>
            </div>
            <p className="mt-4 text-sm text-[#c8ad88]">
              ランチ 11:30-14:00 / ディナー 18:00-22:00 / 月曜・第3火曜定休
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 pt-16 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl border-t border-[#d4c0a4] pt-6 text-xs uppercase tracking-[0.18em] text-[#8b7a64]">
          Website by Cody Labs · cody-labs-site.vercel.app
        </div>
      </footer>
    </main>
  );
}
