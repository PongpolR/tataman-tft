import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const prompt = Noto_Sans_Thai({
  subsets: ["thai", "latin"], // Ensure Thai subset is included
  weight: ["100", "200", "300", "400", "500", "700"], // Choose the font weights you need
});

export const metadata: Metadata = {
  title: "Tataman TFT",
  description: "Tataman TFT Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" href="/ttm.ico" />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={prompt.className}
      >
        {children}
      </body>
    </html>
  );
}
