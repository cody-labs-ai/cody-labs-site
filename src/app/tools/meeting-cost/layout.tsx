import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meeting Cost Calculator | Cody Labs",
  description:
    "Calculate how much your meetings actually cost in salary burn, annual waste, and real-world equivalents. Built to be shared with every calendar victim.",
  openGraph: {
    title: "Meeting Cost Calculator | Cody Labs",
    description:
      "See the true cost of your meetings with live salary math, annual waste, and viral comparisons.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meeting Cost Calculator | Cody Labs",
    description:
      "See the true cost of your meetings with live salary math, annual waste, and viral comparisons.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
