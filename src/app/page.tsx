import './HomePage.scss';
import { Metadata } from 'next';

import sampleBlogPost from '@/data/sampleBlogPost';
import Hero from '@/components/collections/Hero';
import FeaturedTags from '@/components/collections/FeaturedTags';
import FeaturedVideo from '@/components/collections/FeaturedVideo';
import PostColumn from '@/components/collections/PostColumn';
import CommunitySection from '@/components/collections/CommunitySection';
import CallToAction from '@/components/collections/CallToAction';

export const metadata: Metadata = {
  title: 'Dezien',
  description: 'A collective for architecture, tech, design, and more.',
};

export default function Home() {
  const sampleBlogs = [sampleBlogPost, sampleBlogPost, sampleBlogPost];

  return (
    <main className="home-page">
      <div className="home-page__section">
        <Hero />
      </div>

      <div className="home-page__section-full">
        <CallToAction />
      </div>

      <div className="home-page__section">
        <PostColumn blogs={sampleBlogs} />
      </div>

      <div className="home-page__section-full">
        <FeaturedTags tags={sampleBlogPost.tags} />
      </div>

      <div className="home-page__section">
        <PostColumn blogs={sampleBlogs} />
      </div>

      <div className="home-page__section">
        <FeaturedVideo />
      </div>

      <div className="home-page__section">
        <CommunitySection />
      </div>
    </main>
  );
}
