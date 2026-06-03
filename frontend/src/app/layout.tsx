import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "The Bottle Club - Premium Wine Delivery",
  description: "Shop curated red, white, rose, and sparkling wines from The Bottle Club with a modern member experience.",
};

import AIChat from "@/components/AIChat";
import VoiceAssistant from "@/components/VoiceAssistant";
import MobileNav from "@/components/MobileNav";
import SessionSync from "@/components/auth/SessionSync";
import { getSession } from "@/lib/auth-utils";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const accessToken = session?.user?.access_token;
  
  // Determine a preferred language server-side from the Accept-Language
  // header so the initial server render matches the client's preference.
  const hdrs = await headers();
  const acceptRaw = hdrs.get('accept-language');
  const accept = acceptRaw || '';
  const primary = accept.split(',')[0]?.split('-')[0] || 'th';
  const AVAILABLE_LANGS = [
    'th','en','fr','zh','ja','es','de','ko','it','ru','pt','vi','ar','hi','id','tr','nl','pl','sv','da','no','fi','ms','he','el'
  ];
  const preferred = (AVAILABLE_LANGS.includes(primary) ? primary : 'th') as any;

  return (
    <html lang={preferred}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-stone-900`}
      >
        <LanguageProvider initialLanguage={preferred}>
          <SessionSync accessToken={accessToken} />
          {children}
          <VoiceAssistant />
          <AIChat />
          <MobileNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
