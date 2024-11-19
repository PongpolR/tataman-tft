import type { Metadata } from "next";
import { Prompt } from 'next/font/google';
import "./globals.css";

const prompt = Prompt({
  subsets: ['thai', 'latin'], // Ensure Thai subset is included
  weight: ['100', '200', '300', '400', '500', '700'], // Choose the font weights you need
});

export const metadata: Metadata = {
  title: "TatamanTFT",
  description: "Tataman TFT Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={prompt.className}
      >
        {children}
      </body>
    </html>
  );
}
