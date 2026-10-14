import { Sora, Manrope } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/layout/Preloader';
import Cursor from '@/components/layout/Cursor';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageMotion from '@/components/layout/PageMotion';
import ChatWidget from '@/components/chat/ChatWidget';
import { site } from '@/data/site';

const display = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: `${site.name} | Web, Design & AI Solutions`, template: `%s | ${site.name}` },
  description:
    'Reflexo Solutions is an IT studio building websites, graphics, AI automation and AI agents for ambitious brands.',
  openGraph: {
    title: `${site.name} | Web, Design & AI Solutions`,
    description: 'Websites, graphics, AI automation and AI agents for ambitious brands.',
    type: 'website',
  },
};

export const viewport = { themeColor: '#090a0d' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Header />
          <main><PageMotion>{children}</PageMotion></main>
          <Footer />
          <ChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
