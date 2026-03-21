import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email Subject Line Generator | Cody Labs",
  description:
    "Generate cold email subject lines and a complete outreach template for SaaS, agencies, freelancers, e-commerce, consultants, and more.",
  openGraph: {
    title: "Cold Email Subject Line Generator | Cody Labs",
    description:
      "Generate 10 cold email subject lines plus a full email template in seconds.",
    type: "website",
    url: "/tools/cold-email",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Subject Line Generator | Cody Labs",
    description:
      "Generate 10 cold email subject lines plus a full email template in seconds.",
  },
  alternates: {
    canonical: "/tools/cold-email",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
