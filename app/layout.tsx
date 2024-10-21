import type { Metadata } from "next";
import { LiffProvider } from "@/components/LiffProvider"
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFF",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID || ''}>
          {children}
        </LiffProvider>
      </body>
    </html>
  );
}
