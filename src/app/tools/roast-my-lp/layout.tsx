import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roast My Landing Page - Free CRO Audit Tool | Cody Labs",
  description:
    "Get a brutally honest AI-powered CRO audit for your landing page. Score your headline, CTA, trust signals, offer clarity, and more in seconds.",
  openGraph: {
    title: "Roast My Landing Page - Free CRO Audit Tool | Cody Labs",
    description:
      "Get a brutally honest AI-powered CRO audit for your landing page in seconds.",
    type: "website",
    url: "/tools/roast-my-lp",
  },
  alternates: {
    canonical: "/tools/roast-my-lp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
