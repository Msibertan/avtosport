import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Автоспорт - Авто из Европы с доставкой по РФ",
  description: "Автомобили из Европы под ключ. Подбор, доставка, растаможка. Более 2 лет на рынке, 1000+ довольных клиентов. Экономия до 30%.",
  keywords: "авто из европы, автомобили из европы, пригон авто, растаможка авто, Автоспорт",
  authors: [{ name: "Автоспорт" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Автоспорт - Авто из Европы с доставкой по РФ",
    description: "Автомобили из Европы под ключ. Подбор, доставка, растаможка. Более 2 лет на рынке, 1000+ довольных клиентов. Экономия до 30%.",
    url: "https://avtosporteu.ru",
    siteName: "Автоспорт - Авто из Европы",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: "https://avtosporteu.ru/logo.png",
        width: 590,
        height: 322,
        alt: "Автоспорт - Автомобили из Европы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Автоспорт - Авто из Европы с доставкой по РФ",
    description: "Автомобили из Европы под ключ. Подбор, доставка, растаможка. Более 2 лет на рынке, 1000+ довольных клиентов.",
    images: ["https://avtosporteu.ru/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
