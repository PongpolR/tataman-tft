import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import ThemeProvider from "@/app/components/layout/ThemeProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tataman TFT",
  description:
    "บล็อก TFT จาก Tataman — เทคนิค competitive, tips และ tournament recap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoSansThai.className} min-h-screen antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
