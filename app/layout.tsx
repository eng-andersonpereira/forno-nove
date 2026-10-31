import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

const font = Bricolage_Grotesque({ subsets: ["latin"], weight: ["400", "600", "800"] });

export const metadata: Metadata = {
  title: "Forno Nove – Pizzaria",
  description: "Pizzas de forno a lenha. Peça pelo site.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={font.className}>
      <body className="bg-[#12332a] text-[#fbf8f1] antialiased">{children}</body>
    </html>
  );
}