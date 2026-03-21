import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Ugly Duckling Hair Salon | Luxury Redesign Demo",
  description:
    "A modern salon website redesign concept for The Ugly Duckling Hair Salon in Irvington, New Jersey.",
  keywords: [
    "The Ugly Duckling Hair Salon",
    "Irvington hair salon",
    "Essex County salon",
    "hair care",
    "salon redesign",
  ],
  openGraph: {
    title: "The Ugly Duckling Hair Salon | Luxury Redesign Demo",
    description:
      "Simple. Elegant. Beauty. A refined, modern redesign concept for The Ugly Duckling Hair Salon.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ugly Duckling Hair Salon | Luxury Redesign Demo",
    description:
      "A warm, elegant salon website concept for The Ugly Duckling Hair Salon in Irvington, NJ.",
  },
  alternates: {
    canonical: "/demo/ugly-duckling",
  },
};

export default function UglyDucklingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
