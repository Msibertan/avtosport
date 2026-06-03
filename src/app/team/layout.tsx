import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наша команда - Автоспорт",
  description: "Команда профессионалов Автоспорт. 29 специалистов по подбору и доставке автомобилей из Европы. Опыт работы более 11 лет.",
  openGraph: {
    title: "Наша команда - Автоспорт",
    description: "Команда профессионалов Автоспорт. 29 специалистов по подбору и доставке автомобилей из Европы. Опыт работы более 11 лет.",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
