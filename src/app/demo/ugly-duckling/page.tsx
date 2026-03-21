"use client";

const services = [
  {
    title: "Precision Cuts",
    description:
      "Tailored women's, men's, and children's cuts designed to flatter your features and lifestyle.",
  },
  {
    title: "Custom Color",
    description:
      "From rich single-process color to dimensional highlights, balayage, and glossing for radiant shine.",
  },
  {
    title: "Styling & Silk Press",
    description:
      "Elegant blowouts, soft waves, silk presses, and event-ready styling with a polished finish.",
  },
  {
    title: "Hair Treatments",
    description:
      "Deep conditioning, hydration, strengthening, and scalp-focused care that keeps hair healthy and vibrant.",
  },
  {
    title: "Braids & Protective Styles",
    description:
      "Beautiful braid styles and protective looks that balance beauty, comfort, and long-term hair care.",
  },
  {
    title: "Extensions",
    description:
      "Seamless volume and length enhancements for a fuller, more luxurious final look.",
  },
];

const galleryCards = [
  "Signature silk press finishes",
  "Dimensional color transformations",
  "Protective styles & braids",
  "Healthy hair treatment results",
];

export default function UglyDucklingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fbf6ee_0%,#f7efe3_28%,#fffaf4_54%,#efe2cf_100%)] text-[#241c15]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,154,92,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(79,57,34,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(247,239,227,0.58))]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-16 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-[#c49a5c]/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#9b7342] shadow-sm backdrop-blur">
              Essex County Luxury Hair Care
            </span>
            <h1 className="mt-8 font-serif text-5xl leading-tight text-[#1f1712] sm:text-6xl lg:text-7xl">
              The Ugly Duckling
              <span className="block text-[#9b7342]">Hair Salon</span>
            </h1>
            <p className="mt-5 text-lg font-medium uppercase tracking-[0.25em] text-[#7a5c39] sm:text-xl">
              Simple. Elegant. Beauty.
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#4e4033] sm:text-lg">
              Where beauty meets intention. A warm, inviting salon experience
              designed around healthy, beautiful hair in the heart of Irvington.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="tel:+19737324271"
                className="inline-flex items-center justify-center rounded-full bg-[#1f1712] px-8 py-4 text-base font-semibold text-[#fff8ef] shadow-[0_14px_40px_rgba(36,28,21,0.18)] transition hover:-translate-y-0.5 hover:bg-[#2f241c]"
              >
                Book by Phone
              </a>
              <a
                href="#hours-location"
                className="inline-flex items-center justify-center rounded-full border border-[#b89261] bg-white/70 px-8 py-4 text-base font-semibold text-[#6c4f2d] transition hover:border-[#9b7342] hover:bg-white"
              >
                View Hours & Location
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 text-sm text-[#5e4a38] sm:grid-cols-3">
              <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(196,154,92,0.10)] backdrop-blur">
                <p className="font-semibold text-[#9b7342]">Appointments Only</p>
                <p className="mt-2 leading-6">Personalized scheduling for a calm, attentive salon experience.</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(196,154,92,0.10)] backdrop-blur">
                <p className="font-semibold text-[#9b7342]">Healthy Hair Focus</p>
                <p className="mt-2 leading-6">Specializing in care-first services that prioritize beauty and hair health.</p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-[0_10px_30px_rgba(196,154,92,0.10)] backdrop-blur">
                <p className="font-semibold text-[#9b7342]">Irvington, NJ</p>
                <p className="mt-2 leading-6">Serving clients across Irvington and the wider Essex County area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-[#e8d7bf] bg-white/75 p-8 shadow-[0_20px_60px_rgba(104,77,43,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b7342]">About the salon</p>
            <h2 className="mt-4 font-serif text-3xl text-[#241c15] sm:text-4xl">A warm space for beautiful, intentional hair care.</h2>
            <p className="mt-6 text-base leading-8 text-[#564636] sm:text-lg">
              The Ugly Duckling Hair Salon is known as a premier salon in the Essex County area,
              offering a welcoming environment where clients can relax and receive thoughtful,
              detail-oriented service with a warm, family atmosphere.
            </p>
            <p className="mt-5 text-base leading-8 text-[#564636] sm:text-lg">
              Every touchpoint is centered on elegance, comfort, and hair health - from precision
              cuts and custom color to treatments, protective styling, and extensions.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#2b2018] p-8 text-[#f8f1e8] shadow-[0_22px_60px_rgba(36,28,21,0.22)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d6b07a]">Salon details</p>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#d8c2a3]">Phone</dt>
                <dd className="mt-2 text-xl font-semibold">(973) 732-4271</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#d8c2a3]">Address</dt>
                <dd className="mt-2 text-base leading-7 text-[#f2e8db]">892 18th Ave, Irvington, NJ 07111</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.24em] text-[#d8c2a3]">Hours</dt>
                <dd className="mt-2 space-y-1 text-base leading-7 text-[#f2e8db]">
                  <p>Tue-Fri: 9am-6pm</p>
                  <p>Sat: 6am-3pm</p>
                  <p>Appointments only</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="rounded-[2rem] border border-[#e8d7bf] bg-white/70 p-8 shadow-[0_18px_50px_rgba(104,77,43,0.08)] sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b7342]">Services</p>
            <h2 className="mt-4 font-serif text-3xl text-[#241c15] sm:text-4xl">Curated salon services for every stage of your hair journey.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-[#f0dfc6] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(249,241,231,0.95))] p-6 shadow-[0_10px_30px_rgba(180,140,87,0.10)]"
              >
                <div className="mb-4 h-10 w-10 rounded-full bg-[#f2e1c6] ring-8 ring-[#fbf4ea]" />
                <h3 className="text-xl font-semibold text-[#2a2119]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5a4938]">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]" id="hours-location">
          <div className="rounded-[2rem] bg-[#f7efe4] p-8 shadow-[0_20px_60px_rgba(104,77,43,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b7342]">Hours & location</p>
            <h2 className="mt-4 font-serif text-3xl text-[#241c15] sm:text-4xl">Visit the salon in Irvington.</h2>
            <div className="mt-8 space-y-6 text-[#4f4133]">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8e6d45]">Address</p>
                <p className="mt-2 text-lg leading-8">892 18th Ave, Irvington, NJ 07111</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8e6d45]">Opening hours</p>
                <div className="mt-2 space-y-1 text-lg leading-8">
                  <p>Tuesday - Friday: 9am - 6pm</p>
                  <p>Saturday: 6am - 3pm</p>
                  <p>Sunday & Monday: Closed</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#8e6d45]">Booking</p>
                <p className="mt-2 text-lg leading-8">Appointments only for a more personal, relaxed experience.</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#ead8bf] bg-white shadow-[0_22px_60px_rgba(36,28,21,0.12)]">
            <iframe
              title="Map to The Ugly Duckling Hair Salon"
              src="https://www.google.com/maps?q=892%2018th%20Ave%2C%20Irvington%2C%20NJ%2007111&z=15&output=embed"
              className="h-[420px] w-full border-0 sm:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] bg-[#2a2018] p-8 text-[#fff8f0] shadow-[0_24px_60px_rgba(36,28,21,0.20)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d6b07a]">Contact & book</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Ready for your next appointment?</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#e9dbc8] sm:text-lg">
              Call to schedule your visit and enjoy attentive service in a welcoming salon dedicated to healthy, beautiful hair.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="tel:+19737324271"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#d6b07a] px-8 py-4 text-base font-semibold text-[#241c15] transition hover:-translate-y-0.5 hover:bg-[#e4bf8b]"
              >
                Call (973) 732-4271
              </a>
              <span className="text-sm uppercase tracking-[0.24em] text-[#d8c2a3]">Appointments only</span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#ead8bf] bg-white/75 p-8 shadow-[0_18px_50px_rgba(104,77,43,0.08)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#9b7342]">Gallery preview</p>
            <h2 className="mt-4 font-serif text-3xl text-[#241c15] sm:text-4xl">A visual showcase, ready for real salon photography.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {galleryCards.map((card, index) => (
                <div
                  key={card}
                  className="flex min-h-44 items-end rounded-[1.5rem] border border-[#f0dfc6] bg-[linear-gradient(160deg,rgba(244,229,204,0.7),rgba(255,255,255,0.95),rgba(217,183,127,0.35))] p-5"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a27a47]">Placeholder 0{index + 1}</p>
                    <p className="mt-2 text-base font-medium leading-7 text-[#473a2e]">{card}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-[#6a5947]">
              Swap these placeholders with professional photos of the salon interior, signature styles, and client transformations for a fully polished launch.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-10 pt-20 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl border-t border-[#dac3a2] pt-6 text-xs tracking-[0.18em] text-[#8b775f] uppercase">
          Website redesign by Cody Labs · cody-labs-site.vercel.app
        </div>
      </footer>
    </main>
  );
}
