"use client";

const menuItems = [
  {
    title: "前菜 — アンティパスト",
    description:
      "自家製バーニャカウダ、季節野菜のカポナータ、生ハムと旬のフルーツなど。素材の味を活かしたイタリアの前菜をお楽しみください。",
  },
  {
    title: "パスタ",
    description:
      "自家製の手打ちパスタを毎朝仕込んでいます。定番のカルボナーラ、ボロネーゼから季節限定パスタまで。",
  },
  {
    title: "メイン — セコンドピアット",
    description:
      "じっくり焼き上げた仔羊のロースト、鮮魚のアクアパッツァ、鶏もも肉のカチャトーラなど本格的なメインディッシュ。",
  },
  {
    title: "ドルチェ",
    description:
      "自家製ティラミス、パンナコッタ、季節のジェラートなど。食後のひとときを締めくくる手作りデザート。",
  },
  {
    title: "ワイン & ドリンク",
    description:
      "イタリア各地から厳選したワインをグラスでもボトルでも。お料理に合わせたペアリングもご相談ください。",
  },
  {
    title: "コース料理",
    description:
      "シェフおまかせコース（¥5,500〜）。記念日や特別な日に、旬の食材を使った特別な一皿をお届けします。",
  },
];

export default function TrattoriaNakamuraPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf6f1_0%,#f5ede3_30%,#faf8f4_60%,#f0e8dc_100%)] text-[#2c2418]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(180,120,60,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(120,80,40,0.10),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[#c4956a]/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#96703e] shadow-sm backdrop-blur">
              東京・西荻窪の隠れ家イタリアン
            </span>
            <h1 className="mt-8 font-serif text-5xl leading-tight text-[#2c2418] sm:text-6xl lg:text-7xl">
              トラットリア
              <span className="block text-[#8b6234]">ナカムラ</span>
            </h1>
            <p className="mt-5 text-lg font-medium tracking-[0.15em] text-[#7a5c3a] sm:text-xl">
              手打ちパスタと旬のイタリア料理
            </p>
            <p className="mt-8 max-w-xl text-base leading-8 text-[#5a4a38] sm:text-lg">
              西荻窪の路地裏にひっそり佇む15席の小さなトラットリア。
              毎朝仕込む自家製パスタと、市場で選んだ旬の食材で
              心のこもったイタリア料理をお届けします。
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="tel:+81312345678"
                className="inline-flex items-center justify-center rounded-full bg-[#2c2418] px-8 py-4 text-base font-semibold text-[#faf4ec] shadow-[0_14px_40px_rgba(44,36,24,0.18)] transition hover:-translate-y-0.5 hover:bg-[#3d3226]"
              >
                電話で予約する
              </a>
              <a
                href="#access"
                className="inline-flex items-center justify-center rounded-full border border-[#c4956a] bg-white/70 px-8 py-4 text-base font-semibold text-[#6b4f2e] transition hover:border-[#8b6234] hover:bg-white"
              >
                アクセス・営業時間
              </a>
            </div>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 text-sm text-[#5a4a38] sm:grid-cols-3">
            <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(140,100,50,0.08)] backdrop-blur">
              <p className="font-semibold text-[#8b6234]">15席の隠れ家</p>
              <p className="mt-2 leading-6">おひとり様からカップル、ご家族まで。落ち着いた空間でゆっくりお食事を。</p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(140,100,50,0.08)] backdrop-blur">
              <p className="font-semibold text-[#8b6234]">毎朝手打ちパスタ</p>
              <p className="mt-2 leading-6">生地から毎日手作り。もちもちの食感と小麦の香りをお楽しみください。</p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(140,100,50,0.08)] backdrop-blur">
              <p className="font-semibold text-[#8b6234]">厳選イタリアワイン</p>
              <p className="mt-2 leading-6">トスカーナ、ピエモンテ、シチリアなど各地のワインをお料理に合わせて。</p>
            </div>
          </div>
        </div>
      </section>

      {/* About + Details */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[#e2d0b8] bg-white/75 p-8 shadow-[0_20px_60px_rgba(100,75,40,0.08)] sm:p-10">
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
              築地で仕入れた魚介、契約農家の野菜を使った
              正直なイタリア料理を大切にしています。
            </p>
            <p className="mt-4 text-base leading-8 text-[#5a4a38] sm:text-lg">
              常連さんも初めての方も、気軽にお越しください。
            </p>
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

      {/* Menu */}
      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="rounded-[2rem] border border-[#e2d0b8] bg-white/70 p-8 shadow-[0_18px_50px_rgba(100,75,40,0.08)] sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8b6234]">メニュー</p>
            <h2 className="mt-4 font-serif text-3xl text-[#2c2418] sm:text-4xl">
              旬を味わう、シンプルなイタリア料理。
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6a5842]">
              季節ごとにメニューが変わります。詳しくはお電話でお問い合わせください。
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {menuItems.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-[#eed9be] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(250,243,232,0.95))] p-6 shadow-[0_10px_30px_rgba(160,120,60,0.08)]"
              >
                <div className="mb-4 h-10 w-10 rounded-full bg-[#f0dcc4] ring-8 ring-[#faf3ea]" />
                <h3 className="text-lg font-semibold text-[#2c2418]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5a4a38]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Access & Map */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
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
      <section className="mx-auto max-w-6xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="rounded-[2rem] bg-[#2c2418] p-8 text-[#faf4ec] shadow-[0_24px_60px_rgba(44,36,24,0.20)] sm:p-10 lg:p-12">
          <div className="mx-auto max-w-2xl text-center">
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
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d4a86a] px-8 py-4 text-base font-semibold text-[#2c2418] transition hover:-translate-y-0.5 hover:bg-[#e0b87a]"
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
      <footer className="px-6 pb-10 pt-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl border-t border-[#d4c0a4] pt-6 text-xs uppercase tracking-[0.18em] text-[#8b7a64]">
          Website by Cody Labs · cody-labs-site.vercel.app
        </div>
      </footer>
    </main>
  );
}
