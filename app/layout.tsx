import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/store";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dive Card - Premium Pass Cards',
  description: 'Purchase and manage your dive pass cards with ease',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
      <StoreProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
    </SessionProvider>
  );
}