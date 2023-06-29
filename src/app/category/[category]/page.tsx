import './CategoryPage.scss';
import Link from 'next/link';
import { Metadata } from 'next';
import SidePreview from '@/components/blogPreview/SidePreview';
import axios from '@/lib/axios';
import { BlogCategory, BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';

type CategoryPageProps = {
  params: {
    category: BlogCategory;
  };
};

const categories: BlogCategory[] = [
  'architecture',
  'art',
  'interior-design',
  'lifestyle',
  'style-fashion',
  'tech',
  'travel',
];

export async function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

const getBlogsByCategory = async (category: string) => {
  const response = await axios.get(`/api/posts/category/${category}`);
  const posts = response.data.posts as BlogPost[];
  const formattedPosts = posts.map((post) => unescapeBlogPost(post));

  return formattedPosts;
};

export async function generateMetadata(
  props: CategoryPageProps,
): Promise<Metadata> {
  const { category } = props.params;

  return {
    title: `Category - ${category}`,
  };
}

async function CategoryPage(props: CategoryPageProps) {
  const { category } = props.params;
  const posts = await getBlogsByCategory(category);

  return (
    <main className="cat-page">
      <h1 className="cat-page__title">Category: {category}</h1>
      {posts.length > 0 ? (
        <ul className="cat-page__list">
          {posts.map((post) => (
            <SidePreview key={`category__${post._id}`} blog={post} />
          ))}
        </ul>
      ) : (
        <div className="cat-page__empty">
          <p className="cat-page__quiet">
            It&apos;s a bit too quiet in here...
          </p>
        </div>
      )}

      <h3 className="cat-page__heading">Check out the other categories:</h3>
      <ul className="cat-page__list">
        {categories.map((currCategory) => {
          if (currCategory !== category) {
            return (
              <li key={`other-${currCategory}`}>
                <Link
                  href={`/category/${currCategory}`}
                  className="cat-page__category-link"
                >
                  {currCategory}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </main>
  );
}
export default CategoryPage;
