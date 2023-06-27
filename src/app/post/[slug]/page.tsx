import './PostPage.scss';
import Link from 'next/link';
import unescape from 'validator/lib/unescape';
import { format } from 'date-fns';
import { Metadata } from 'next';

import { CommentProvider } from '@/context/CommentContext';
import axios from '@/lib/axios';
import { BlogPost } from '@/types/types';

import sampleBlogPost from '@/data/sampleBlogPost';
import SmallPreview from '@/components/blogPreview/SmallPreview';
import CommentFeed from '@/components/comments/CommentFeed';
import LikePostButton from '@/components/buttons/LikePostButton';

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

export async function generateMetadata(
  props: PostPageProps,
): Promise<Metadata> {
  const { slug } = props.params;

  const response = await axios.get(`/api/posts/${slug}`);
  const blog = response.data.post;

  return {
    title: blog.title,
  };
}

// export async function generateStaticParams() {
//   const response = await axios.get('/api/posts');
//   const posts = response.data.posts as BlogPost[];

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

function PostPage(props: PostPageProps) {
  const { slug } = props.params;
  // const post = (await getBlogPost(slug)) as BlogPost;
  const post = sampleBlogPost;

  const formattedDate = format(new Date(post.date_created), 'LL.dd.yy');

  return (
    <div className="post-page">
      {/* META */}
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
            by{' '}
            <Link href={`/user/${post.author.username}`}>
              {post.author.first_name} {post.author.last_name}
            </Link>
          </span>
        </div>
      </article>

      {/* DISPLAY IMG */}
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

      {/* MAIN */}
      <main className="post-page__content">
        {unescape(post.content)}
        {/* like post  */}
      </main>

      <div className="post-page__like-post">
        <LikePostButton blog={post} />
      </div>

      {/* TAGS */}
      {post.tags.length > 0 && (
        <section className="post-page__tags">
          <h3 className="post-page__tags-title" id="post-page__tags-title">
            Tags
          </h3>

          <ul className="post-page__tags-list">
            {post.tags.map((tag) => (
              <li key={`tag-${tag._id}`} className="post-page__tags-item">
                <Link href={`/tag/${tag.name}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* COMMENTS */}
      <section
        className="post-page__comments"
        aria-labelledby="post-page__comments-title"
      >
        <CommentProvider parentPost={post}>
          <h3
            id="post-page__comments-title"
            className="post-page__comments-title"
          >
            Comments
          </h3>
          <CommentFeed comments={post.comments} />
        </CommentProvider>
      </section>

      {/* FEATURED / LINKS TO OTHER POSTS */}
      <section
        className="post-page__featured"
        aria-labelledby="post-page__featured-title"
      >
        <h3
          id="post-page__featured-title"
          className="post-page__featured-title"
        >
          Trending Posts
        </h3>

        <ul className="post-page__featured-list">
          <li className="post-page__featured-item">
            <SmallPreview blog={post} />
          </li>
          <li className="post-page__featured-item">
            <SmallPreview blog={post} />
          </li>
          <li className="post-page__featured-item">
            <SmallPreview blog={post} />
          </li>
          <li className="post-page__featured-item">
            <SmallPreview blog={post} />
          </li>
        </ul>
      </section>
    </div>
  );
}
export default PostPage;
