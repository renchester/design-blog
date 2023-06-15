import { inter, roboto, montserrat, raleway, playfair } from '@/utils/fonts';
import '@/styles/globals.scss';
import 'material-symbols';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Dezien',
    default: 'The best place for discovering design',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${montserrat.variable} ${raleway.variable} ${playfair.variable}`}
      >
        <div className="container">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
