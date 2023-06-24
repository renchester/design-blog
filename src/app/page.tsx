import './HomePage.scss';
import Hero from '@/components/hero/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dezien',
  description: 'A collective for architecture, tech, design, and more.',
};

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
    </main>
  );
}
