import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rando France — Randonnées pédestres",
  description: "Trouvez les plus belles randonnées pédestres en France : fiches détaillées, traces GPX, difficulté, dénivelé et photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
