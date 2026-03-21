import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trattoria Nakamura | 西荻窪の隠れ家イタリアン",
  description: "西荻窪駅徒歩3分。毎朝手打ちの自家製パスタと旬のイタリア料理。15席の小さなトラットリアで、心のこもった一皿をお届けします。",
};

export default function TrattoriaNakamuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
