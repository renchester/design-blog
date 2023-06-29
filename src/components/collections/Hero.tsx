import { BlogPost } from '@/types/types';
import HeroPreview from '../blogPreview/HeroPreview';
import './Hero.scss';
import axios from '@/lib/axios';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';

const getBlogPosts = async () => {
  const response = await axios.get('/api/posts?limit=5');
  const posts = response.data.posts as BlogPost[];
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
