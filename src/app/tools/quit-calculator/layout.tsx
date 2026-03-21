import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Should I Quit My Job? Calculator | Cody Labs",
  description:
    "A fun, brutally honest calculator that scores whether you're actually ready to quit your job based on runway, side income, traction, dependents, and job satisfaction.",
  openGraph: {
    title: "Should I Quit My Job? Calculator | Cody Labs",
    description:
      "Calculate your runway, risk score, and get a clear verdict on whether it's time to quit your job.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Should I Quit My Job? Calculator | Cody Labs",
    description:
      "Calculate your runway, risk score, and get a clear verdict on whether it's time to quit your job.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
