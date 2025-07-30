import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lingo',
  description: 'Learn new languages with Lingo!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={cn(nunito.variable, 'antialiased')}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
