import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trattoria SPEAKEASY | 西荻窪の隠れ家イタリアン",
  description: "西荻窪駅南口徒歩1分。化学調味料不使用、素材にこだわった本格イタリアン。路地裏の隠れ家で、大人の時間をお過ごしください。",
};

export default function SpeakeasyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
