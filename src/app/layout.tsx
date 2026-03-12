import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rando France — Randonnées pédestres en France",
  description: "Trouvez les plus belles randonnées pédestres en France : fiches détaillées, traces GPX, difficulté, dénivelé et photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={outfit.variable}>
      <body className="font-sans antialiased bg-white text-[#111111]">
        {children}
      </body>
    </html>
  );
}
