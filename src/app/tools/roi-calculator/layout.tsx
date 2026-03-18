import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solopreneur ROI Calculator - Free Tool | Cody Labs",
  description:
    "Calculate how much time and money you can save by automating tasks with AI. Free ROI calculator for solopreneurs, freelancers, and small business owners.",
  openGraph: {
    title: "AI Solopreneur ROI Calculator - Free Tool | Cody Labs",
    description:
      "Calculate how much time and money you can save by automating tasks with AI.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
