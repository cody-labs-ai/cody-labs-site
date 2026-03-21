import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Pricing Calculator - Free Tool | Cody Labs",
  description:
    "Model your SaaS unit economics instantly. Calculate MRR, ARR, LTV, LTV:CAC ratio, CAC payback period, and break-even users with Cody Labs' free SaaS pricing calculator.",
  openGraph: {
    title: "SaaS Pricing Calculator - Free Tool | Cody Labs",
    description:
      "Run the numbers on your SaaS pricing, retention, and acquisition strategy with a free calculator built for founders.",
    type: "website",
    url: "https://cody-labs-site.vercel.app/tools/saas-pricing",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Pricing Calculator - Free Tool | Cody Labs",
    description:
      "Calculate MRR, ARR, LTV, CAC payback, and break-even users for your SaaS in seconds.",
  },
  alternates: {
    canonical: "https://cody-labs-site.vercel.app/tools/saas-pricing",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
