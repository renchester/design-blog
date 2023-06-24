import './HeroPreview.scss';
import Link from 'next/link';
import { BlogPost } from '@/types/types';
import generatePostLink from '@/utils/generatePostLink';

type HeroPreviewProps = {
  blog: BlogPost;
  isMain?: boolean;
};

function HeroPreview(props: HeroPreviewProps) {
  const { blog, isMain } = props;
  const blogID = `hero-pvw__title-${blog._id}`;
  const blogLink = generatePostLink(blog.slug);

  return (
    <article className="hero-pvw" aria-labelledby={blogID}>
      <div className="hero-pvw__display">
        <Link href={blogLink}>
          <img
            src={blog.display_img.url}
            alt={blog.title}
            className={`hero-pvw__img ${isMain && 'main'}`}
          />
        </Link>
        <Link
          href={`/category/${blog.category}`}
          className="hero-pvw__category"
          aria-label="Blog Category"
        >
          {blog.category}
        </Link>
      </div>
      <div className="hero-pvw__info">
        <Link href={blogLink}>
          <h2 id={blogID} className={`hero-pvw__title ${isMain && 'main'}`}>
            {blog.title}
          </h2>
          <p className={`hero-pvw__content ${!isMain && 'side'}`}>
            {blog.content}
          </p>
        </Link>
      </div>
    </article>
  );
}
export default HeroPreview;
