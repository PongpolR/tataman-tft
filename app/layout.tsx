import type { Metadata } from "next";
import { Prompt } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const chatthai = localFont({
  src: './fonts/CSChatThai.woff',
  variable: "--",
  weight: "100 900",
});

const prompt = Prompt({
  subsets: ['thai', 'latin'], // Ensure Thai subset is included
  weight: ['100', '200', '300', '400', '500', '700'], // Choose the font weights you need
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
