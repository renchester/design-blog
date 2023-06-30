import './LatestPage.scss';
import axios from '@/lib/axios';
import { BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import { Metadata } from 'next';
import SidePreview from '@/components/blogPreview/SidePreview';
import PaginatePosts from '@/components/pagination/PaginatePosts';

type LatestPageProps = {
  params: {
    page: number;
  };
};

const getBlogPosts = async (page: number) => {
  const response = await axios.get(`/api/posts?page=${page}`);
  const posts = response.data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return {
    posts: formattedPosts,
    postCount: response.headers['x-total-count'],
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
