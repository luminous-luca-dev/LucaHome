import type { Metadata } from 'next';
import { Playfair_Display, Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap', weight: ['400', '500', '700'], style: ['normal', 'italic'] });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto', display: 'swap', weight: ['400', '500'] });

export const metadata: Metadata = { title: 'Portfolio — Software Engineer', description: 'フルスタックエンジニアのポートフォリオ。Next.js・TypeScript・Pythonを軸に、ユーザーに届くプロダクトを作ります。', openGraph: { title: 'Portfolio — Luca', description: '永田のポートフォリオサイトへようこそ。ゆっくりしていってね！　Youth is not a time of life; it is a state of mind.', type: 'website' } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${playfair.variable} ${inter.variable} ${notoSansJP.variable}`}>
      <body>{children}</body>
    </html>
  );
}
