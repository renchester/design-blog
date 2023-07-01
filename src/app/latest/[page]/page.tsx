import './LatestPage.scss';
import { Metadata } from 'next';

import { API_URL } from '@/config/config';
import { BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import SidePreview from '@/components/blogPreview/SidePreview';
import PaginatePosts from '@/components/pagination/PaginatePosts';

type LatestPageProps = {
  params: {
    page: number;
  };
};

const getBlogPosts = async (page: number) => {
  const response = await fetch(`${API_URL}/api/posts?page=${page}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  const data = await response.json();
  const postCount = Number.parseInt(
    response.headers.get('x-total-count') || '0',
  );

  const posts = data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return {
    posts: formattedPosts,
    postCount,
  };
};

export async function generateMetadata(
  props: LatestPageProps,
): Promise<Metadata> {
  const { page } = props.params;

  return {
    title: `Latest - Page ${page}`,
  };
}

async function LatestPage(props: LatestPageProps) {
  const { page } = props.params;
  const { posts, postCount } = await getBlogPosts(page);
  const pageCount = Math.ceil(postCount / 10);

  return (
    <div className="latest-page">
      <h1 className="latest-page__title">Latest Posts</h1>

      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <SidePreview blog={post} key={`latest-post__${post.slug}`} />
          ))}
        </>
      ) : (
        <p>There are no posts yet...</p>
      )}

      {posts.length > 0 && (
        <PaginatePosts currentPage={page} pageCount={pageCount} />
      )}
    </div>
  );
}

export default LatestPage;
