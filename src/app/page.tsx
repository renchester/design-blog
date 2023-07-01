import './HomePage.scss';
import { Metadata } from 'next';
import Link from 'next/link';

import { API_URL } from '@/config/config';
import Hero from '@/components/collections/Hero';
import FeaturedTags from '@/components/collections/FeaturedTags';
import FeaturedVideo from '@/components/collections/FeaturedVideo';
import PostColumn from '@/components/collections/PostColumn';
import CommunitySection from '@/components/collections/CommunitySection';
import CallToAction from '@/components/collections/CallToAction';
import { BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';

const getBlogPosts = async () => {
  const response = await fetch(`${API_URL}/api/posts`, {
    next: { revalidate: 600 }, // Revalidate every 10 mins
  });
  const data = await response.json();
  const posts = data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return formattedPosts;
};

export const metadata: Metadata = {
  title: 'Home Page | Dezien',
  description: 'A collective for architecture, tech, design, and more.',
};

export default async function Home() {
  const blogs = await getBlogPosts();
  const firstHalf = blogs.slice(0, 5);
  const secondHalf = blogs.slice(5);

  return (
    <main className="home-page">
      <div className="home-page__section">
        <Hero />
      </div>

      <div className="home-page__section-full">
        <CallToAction />
      </div>

      <div className="home-page__section">
        <PostColumn blogs={firstHalf} />
      </div>

      <div className="home-page__section-full">
        <FeaturedTags tags={blogs[1].tags} />
      </div>

      <div className="home-page__section">
        <PostColumn blogs={secondHalf} />
      </div>

      <div className="home-page__section">
        <Link href="/latest/1" className="home-page__all">
          See All Posts
        </Link>
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
