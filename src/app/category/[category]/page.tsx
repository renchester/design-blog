import axios from '@/lib/axios';
import { BlogCategory } from '@/types/types';

type CategoryPageProps = {
  params: {
    category: BlogCategory;
  };
};

export async function generateStaticParams() {
  const categories: BlogCategory[] = [
    'architecture',
    'art',
    'interior design',
    'lifestyle',
    'style + fashion',
    'tech',
    'travel',
  ];

  return categories.map((category) => ({ category }));
}

const getBlogsByCategory = async (category: string) => {
  const response = await axios.get(`/api/category/${category}`);
  const posts = response.data.posts;
  return posts;
};

function CategoryPage(props: CategoryPageProps) {
  const { category } = props.params;
  // const posts = await getBlogsByCategory(category);

  return <div>CategoryPage for {category}</div>;
}
export default CategoryPage;
