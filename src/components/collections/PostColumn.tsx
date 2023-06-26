import './PostColumn.scss';
import { BlogPost } from '@/types/types';
import SidePreview from '../blogPreview/SidePreview';

type PostColumnProps = {
  blogs: BlogPost[];
};

function PostColumn(props: PostColumnProps) {
  const { blogs } = props;

  return (
    <section className="post-col">
      {blogs.map((blog) => (
        <SidePreview blog={blog} key={`post-col__${blog._id}`} />
      ))}
    </section>
  );
}

export default PostColumn;
