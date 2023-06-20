import {
  Roboto,
  Raleway,
  Montserrat,
  Playfair_Display,
  Inter,
  Poppins,
} from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
});

export const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
  preload: false,
});

export const raleway = Raleway({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-raleway',
  display: 'swap',
  preload: false,
});

export const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
});

export const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false,
});

export const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
});
