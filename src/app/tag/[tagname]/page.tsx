import './TagPage.scss';
import SidePreview from '@/components/blogPreview/SidePreview';
import { API_URL } from '@/config/config';
import { BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import { Metadata } from 'next';

type TagPageProps = {
  params: {
    tagname: string;
  };
};

const getBlogsByTagname = async (tagname: string) => {
  const response = await fetch(`${API_URL}/api/posts/tag/${tagname}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  const data = await response.json();

  const posts = data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => post && unescapeBlogPost(post));

  return formattedPosts;
};

export async function generateMetadata(props: TagPageProps): Promise<Metadata> {
  const { tagname } = props.params;

  return {
    title: `Tag - ${tagname}`,
  };
}

async function TagPage(props: TagPageProps) {
  const { tagname } = props.params;
  const posts = await getBlogsByTagname(tagname);

  return (
    <main className="tag-page">
      <h1 className="tag-page__title">#{tagname}</h1>
      {posts.length > 0 ? (
        <ul className="tag-page__list">
          {posts.map((post) => (
            <SidePreview key={`tag__${post._id}`} blog={post} />
          ))}
        </ul>
      ) : (
        <div className="tag-page__empty">
          <p className="tag-page__quiet">
            It&apos;s a bit too quiet in here...
          </p>
        </div>
      )}
    </main>
  );
}
export default TagPage;
