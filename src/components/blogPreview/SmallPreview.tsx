import './SmallPreview.scss';
import Link from 'next/link';
import { BlogPost } from '@/types/types';
import generatePostLink from '@/utils/generatePostLink';

type SmallPreviewProps = {
  blog: BlogPost;
};

function SmallPreview(props: SmallPreviewProps) {
  const { blog } = props;
  const blogID = `small-pvw__title-${blog._id}`;
  const blogLink = generatePostLink(blog.slug);

  return (
    <article className="small-pvw" aria-labelledby={blogID}>
      <div className="small-pvw__display">
        <Link href={blogLink}>
          <img
            src={blog.display_img.url}
            alt={blog.title}
            className="small-pvw__img"
          />
        </Link>
        <Link
          href={`/category/${blog.category}`}
          className="small-pvw__category"
          aria-label="Blog Category"
        >
          {blog.category}
        </Link>
      </div>

      <div className="small-pvw__info">
        <Link href={blogLink}>
          <h2 id={blogID} className="small-pvw__title">
            {blog.title}
          </h2>
          <p className="small-pvw__content">{blog.content}</p>
        </Link>
      </div>
    </article>
  );
}

export default SmallPreview;
