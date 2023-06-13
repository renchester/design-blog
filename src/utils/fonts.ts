import {
  Roboto,
  Raleway,
  Montserrat,
  Playfair_Display,
  Inter,
} from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto',
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
});
