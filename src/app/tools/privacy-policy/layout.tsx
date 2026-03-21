import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy Generator - Free Tool | Cody Labs",
  description:
    "Generate a ready-to-edit privacy policy for your website or app with a complete template, conditional sections, and instant copy/download actions.",
  openGraph: {
    title: "Privacy Policy Generator - Free Tool | Cody Labs",
    description:
      "Create a privacy policy for your website or app with a comprehensive template tailored to your data collection and third-party services.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
