import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/store";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Carte de Plongée - Cartes de Pass Premium',
  description: 'Achetez et gérez vos cartes de pass de plongée en toute simplicité',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session} >
      <html lang="fr" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="ligth"
            enableSystem>
            <StoreProvider>
              {children}
              <Toaster />
            </StoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}