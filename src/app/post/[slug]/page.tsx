import './PostPage.scss';
import axios from '@/lib/axios';
import { BlogPost } from '@/types/types';
import { format } from 'date-fns';
import Link from 'next/link';
import unescape from 'validator/lib/unescape';

type PostPageProps = {
  params: {
    slug: string;
  };
};

const getBlogPost = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  const post = response.data.post;
  return post;
};

export async function generateStaticParams() {
  const response = await axios.get('/api/posts');
  const posts = response.data.posts as BlogPost[];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const JSON_data = {
  display_img: {
    url: 'https://images.unsplash.com/photo-1685777122043-8185dd1fa6d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    owner: 'Alessio Zappatore',
    source: 'Unsplash',
  },
  _id: '6481da04f9cdeca3d7ee0dda',
  date_created: '2023-06-08T13:35:48.370Z',
  title: ' Lorem ipsum facere eniet ab ipsum vel , placeat aperiam amet ',
  slug: 'hello',
  author: {
    is_admin: false,
    is_verified_author: false,
    _id: '64807adcd2abd38380389b36',
    username: 'renchester',
    email: 'chesterramos5699@gmail.com',
    first_name: 'Renchester',
    last_name: 'ramos',
  },
  editors: [],
  liked_by: [],
  tags: [],
  content:
    ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. In a facere eveniet ab ipsum vel beatae sed ad aliquid totam, placeat aperiam dignissimos doloremque iste, at amet eum eius? Minima!',
  comments: [
    {
      date_created: '2023-06-09T15:58:44.871Z',
      author: '64807adcd2abd38380389b36',
      content: '&lt;sample&gt;&amp;&amp;&#x27; comment',
      comment_level: 0,
      liked_by: [],
      edits: [],
      _id: '64834c7459426fa4c9bff774',
    },
    {
      date_created: '2023-06-09T16:01:15.908Z',
      author: '64807adcd2abd38380389b36',
      content: '&lt;sample&gt;&amp;&amp;&#x27; comment',
      comment_level: 0,
      liked_by: [],
      edits: [],
      _id: '64834cd406d186230163c132',
    },
  ],
  edits: [],
  category: 'architecture',
  is_private: false,
};

function PostPage(props: PostPageProps) {
  const { slug } = props.params;
  // const post = (await getBlogPost(slug)) as BlogPost;
  const post = JSON_data;

  const formattedDate = format(new Date(post.date_created), 'LL.dd.yy');

  return (
    <div className="post-page">
      <article className="post-page__main">
        <Link
          href={`/category/${post.category}`}
          className="post-page__category"
        >
          {post.category}
        </Link>

        <h1 className="post-page__title">{post.title}</h1>
        <div className="post-page__meta">
          <time
            dateTime={post.date_created.toString()}
            className="post-page__meta-date"
          >
            {formattedDate}
          </time>{' '}
          |
          <span className="post-page__meta-info">
            {' '}
            by {post.author.first_name} {post.author.last_name}
          </span>
        </div>
      </article>

      <article className="post-page__display">
        <img
          src={post.display_img.url}
          alt="Cover image"
          className="post-page__display-img"
        />
        <span className="post-page__display-meta">
          Photo by {post.display_img.owner} from {post.display_img.source}
        </span>
      </article>

      <main className="post-page__content">{unescape(post.content)}</main>
    </div>
  );
}
export default PostPage;
