import './Hero.scss';

import { BlogPost } from '@/types/types';
import HeroPreview from '../blogPreview/HeroPreview';
import { API_URL } from '@/config/config';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';

const getBlogPosts = async () => {
  const response = await fetch(`${API_URL}/api/posts?limit=5`, {
    next: { revalidate: 600 }, // Revalidate every 10 mins
  });
  const data = await response.json();
  const posts = data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));
  return formattedPosts;
};

async function Hero() {
  const blogPosts = await getBlogPosts();

  return (
    <section className="hero">
      <div className="hero__col-side">
        <HeroPreview blog={blogPosts[1]} />
        <HeroPreview blog={blogPosts[2]} />
      </div>

      <div className="hero__col-main">
        <HeroPreview blog={blogPosts[0]} isMain />
      </div>

      <div className="hero__col-side">
        <HeroPreview blog={blogPosts[3]} />
        <HeroPreview blog={blogPosts[4]} />
      </div>
    </section>
  );
}

export default Hero;
