import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { preconnect } from 'react-dom';
import type { Metadata } from 'next';
import { sharedMeta } from '@pkg/common/config/sitemapAndFeeds';
import { appConfig } from '@/config/app';

const fontGeist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['400', '500', '600', '700'],
  display: 'optional',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'optional',
});

export const metadata: Metadata = {
  title: 'Lucidity Starter',
  description: 'The Enterprise-Ready Next.js 15 + SanityCMS Starter',
  alternates: sharedMeta(appConfig.baseUrl).alternates,
  authors: { url: `${appConfig.baseUrl}/humans.txt` },
  robots: { index: !appConfig.metadata.noIndex },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  preconnect('https://cdn.sanity.io');

  return (
    <html lang="en">
      <body className={`${fontGeist.variable} ${fontMono.variable} font-geist antialiased`}>
        {children}
      </body>
    </html>
  );
}
