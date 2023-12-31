import '@/styles/_post.scss';
import Link from 'next/link';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import unescape from 'validator/lib/unescape';
import { format } from 'date-fns';
import { Metadata } from 'next';

import { API_URL } from '@/config/config';
import { BlogPost } from '@/types/types';
import { CommentProvider } from '@/context/CommentContext';

import SmallPreview from '@/components/blogPreview/SmallPreview';
import CommentFeed from '@/components/comments/CommentFeed';
import LikePostButton from '@/components/buttons/LikePostButton';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import Loading from '@/components/loading/Loading';

type PostPageProps = {
  params: {
    slug: string;
  };
};

const getBlogPost = async (slug: string) => {
  const response = await fetch(`${API_URL}/api/posts/${slug}`, {
    next: { revalidate: 86400 }, // Revalidation = 1 day
  });
  const data = await response.json();
  const post = data.post as BlogPost;

  return unescapeBlogPost(post);
};

const getTrendingPosts = async () => {
  const response = await fetch(`${API_URL}/api/posts?limit=4`, {
    next: { revalidate: 86400 },
  });
  const data = await response.json();
  const posts = data.posts as BlogPost[];

  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return formattedPosts;
};

export async function generateMetadata(
  props: PostPageProps,
): Promise<Metadata> {
  const { slug } = props.params;

  const response = await fetch(`${API_URL}/api/posts/${slug}`);
  const data = await response.json();
  const post = data.post as BlogPost;

  return {
    title: unescape(post.title),
  };
}

export async function generateStaticParams() {
  const response = await fetch(`${API_URL}/api/posts`);
  const data = await response.json();
  const posts = data.posts as BlogPost[];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function PostPage(props: PostPageProps) {
  const { slug } = props.params;
  const post = await getBlogPost(slug);
  const trendingPosts = await getTrendingPosts();

  const formattedDate = format(new Date(post.date_created), 'LL.dd.yy');

  return (
    <div className="post">
      {/* META */}
      <article className="post__main">
        <Link href={`/category/${post.category}`} className="post__category">
          {post.category}
        </Link>

        <h1 className="post__title">{post.title}</h1>
        <div className="post__meta">
          <time
            dateTime={post.date_created.toString()}
            className="post__meta-date"
          >
            {formattedDate}
          </time>{' '}
          |
          <span className="post__meta-info">
            {' '}
            by{' '}
            <Link href={`/user/${post.author.username}`}>
              {post.author.first_name} {post.author.last_name}
            </Link>
          </span>
        </div>
      </article>
      {/* DISPLAY IMG */}
      <article className="post__display">
        <img
          src={post.display_img.url}
          alt="Cover image"
          className="post__display-img"
        />
        <span className="post__display-meta">
          Photo by {post.display_img.owner} from {post.display_img.source}
        </span>
      </article>
      {/* MAIN */}
      <main className="post__content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </main>
      <div className="post__like-post">
        <LikePostButton blog={post} />
      </div>
      {/* TAGS */}
      {post.tags.length > 0 && (
        <section className="post__tags">
          <h3 className="post__tags-title" id="post__tags-title">
            Tags
          </h3>

          <ul className="post__tags-list">
            {post.tags.map((tag) => (
              <li key={`post-tag-${tag}`} className="post__tags-item">
                <Link href={`/tag/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* COMMENTS */}
      <section
        className="post__comments"
        aria-labelledby="post__comments-title"
      >
        <CommentProvider parentPost={post}>
          <h3 id="post__comments-title" className="post__comments-title">
            Comments
          </h3>
          <Suspense fallback={<Loading message="Loading comments..." />}>
            <CommentFeed postSlug={post.slug} />
          </Suspense>
        </CommentProvider>
      </section>
      {/* FEATURED / LINKS TO OTHER POSTS */}
      <section
        className="post__featured"
        aria-labelledby="post__featured-title"
      >
        <h3 id="post__featured-title" className="post__featured-title">
          Trending Posts
        </h3>

        <ul className="post__featured-list">
          {trendingPosts.map((post) => (
            <li className="post__featured-item" key={`trending-${post.slug}`}>
              <SmallPreview blog={post} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
export default PostPage;
