// app/layout.js
import { Montserrat, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/component/Navbar';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'FUSION Car Report',
  description: 'Premium vehicle history reports',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans bg-gray-50">
        <main className="min-h-[calc(100vh-80px)]">
          <Navbar />
          {children}

        </main>
      </body>
    </html>
  );
}