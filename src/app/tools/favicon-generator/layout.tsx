import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Favicon Generator | Cody Labs",
  description:
    "Generate a simple text favicon online with custom colors, font style, and shape. Preview it instantly and download as PNG or favicon.ico.",
  openGraph: {
    title: "Free Favicon Generator | Cody Labs",
    description:
      "Create a text-based favicon in seconds with live canvas preview and instant downloads.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Favicon Generator | Cody Labs",
    description:
      "Create a text-based favicon in seconds with live canvas preview and instant downloads.",
  },
  alternates: {
    canonical: "/tools/favicon-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
