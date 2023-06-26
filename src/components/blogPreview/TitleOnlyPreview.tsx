import './TitleOnlyPreview.scss';
import { BlogPost } from '@/types/types';
import Link from 'next/link';

type TitleOnlyPreviewProps = {
  blog: BlogPost;
};

function TitleOnlyPreview(props: TitleOnlyPreviewProps) {
  const { blog } = props;
  const blogID = `title-only-article__${blog._id}`;
  const blogLink = `/post/${blog.slug}`;

  return (
    <article className="ttl-pvw" aria-labelledby={blogID}>
      <Link href={blogLink} className="ttl-pvw__img-wrapper">
        <img
          className="ttl-pvw__img"
          src={blog.display_img.url}
          alt={blog.title}
        />
      </Link>
      <div className="ttl-pvw__meta">
        <Link className="ttl-pvw__category" href={`/category/${blog.category}`}>
          {blog.category}
        </Link>
        <Link href={blogLink}>
          <h2 className="ttl-pvw__title" id={blogID}>
            {blog.title}
          </h2>
        </Link>
      </div>
    </article>
  );
}
export default TitleOnlyPreview;
