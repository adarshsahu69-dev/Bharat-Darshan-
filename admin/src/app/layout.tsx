import './globals.css';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Bharat Darshan — Admin',
  description: 'Content and operations console for Bharat Darshan',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ margin: 0, fontFamily: 'var(--font-inter)' }}>
        {children}
      </body>
    </html>
  );
}
