import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Noto_Sans_Thai } from "next/font/google";
import ThemeProvider from "@/app/components/layout/ThemeProvider";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
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
      <body
        className={`${notoSansThai.variable} ${ibmPlexSansThai.variable} ${notoSansThai.className} min-h-screen antialiased`}
        style={
          {
            "--font-display": "var(--font-ibm-plex), var(--font-noto), sans-serif",
          } as React.CSSProperties
        }
      >
        <div className="site-bg-orbs" aria-hidden>
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-accent-muted/5 blur-3xl" />
        </div>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
