import './SidePreview.scss';
import Link from 'next/link';
import { BlogPost } from '@/types/types';
import generatePostLink from '@/utils/generatePostLink';

type SidePreviewProps = {
  blog: BlogPost;
};

function SidePreview(props: SidePreviewProps) {
  const { blog } = props;
  const blogID = `side-pvw__title-${blog._id}`;
  const blogLink = generatePostLink(blog.slug);

  return (
    <article className="side-pvw" aria-labelledby={blogID}>
      <Link href={blogLink} className="side-pvw__display">
        <img
          src={blog.display_img.url}
          alt={blog.title}
          className="side-pvw__img"
        />
      </Link>
      <div className="side-pvw__info">
        <Link
          href={`/category/${blog.category}`}
          className="side-pvw__category"
          aria-label="Blog Category"
        >
          {blog.category}
        </Link>

        <Link href={blogLink} className="side-pvw__info-link">
          <h2 id={blogLink} className="side-pvw__title">
            {blog.title}
          </h2>
          <p className="side-pvw__content">{blog.content}</p>
        </Link>
      </div>
    </article>
  );
}
export default SidePreview;
