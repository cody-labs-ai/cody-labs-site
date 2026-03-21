import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizzeria GINA | 西荻窪のピッツェリア",
  description: "西荻窪駅北口徒歩5分。薪窯で焼き上げる本格ナポリピッツァとイタリア家庭料理。ランチ・ディナー営業。ご予約はお電話で。",
};

export default function PizzeriaGinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
