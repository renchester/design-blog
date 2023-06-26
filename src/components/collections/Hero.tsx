import { BlogPost } from '@/types/types';
import HeroPreview from '../blogPreview/HeroPreview';
import './Hero.scss';
import Link from 'next/link';
import axios from '@/lib/axios';

const getPost = async () => {
  const response = await axios.get('/api/posts');
  const post = response.data.posts[0];

  return post;
};

async function Hero() {
  // const sampleBlog: BlogPost = {
  //   _id: '1',
  //   content:
  //     'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque quae corporis ipsum, non totam eveniet ratione sit ullam dignissimos voluptates veniam. Quos, quisquam maxime necessitatibus corrupti consequuntur veritatis similique sed.',
  //   title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
  //   date_created: new Date(),
  //   category: 'lifestyle',
  //   author: {
  //     _id: 'author-1',
  //     first_name: 'Renchester',
  //     last_name: 'Ramos',
  //     username: 'rkahn',
  //     email: 'r@gmail.com',
  //     is_admin: true,
  //   },
  //   editors: [],
  //   slug: 'sample-title',
  //   liked_by: [],
  //   edits: [],
  //   is_private: false,
  //   comments: [],
  //   tags: [],
  // };

  const sampleBlog = (await getPost()) as BlogPost;
  const blogString = JSON.stringify(sampleBlog);

  return (
    <section className="hero">
      <div className="hero__col-side">
        <HeroPreview blog={sampleBlog} />
        <HeroPreview blog={sampleBlog} />
      </div>

      <div className="hero__col-main">
        <HeroPreview blog={sampleBlog} isMain />
      </div>

      <div className="hero__col-side">
        <HeroPreview blog={sampleBlog} />
        <HeroPreview blog={sampleBlog} />
      </div>
    </section>
  );
}

export default Hero;
