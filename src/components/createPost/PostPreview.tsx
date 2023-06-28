'use client';

import '@/styles/_post.scss';
import ReactMarkdown from 'react-markdown';
import { type AuthoredPost } from './CreatePost';

type PostPreviewProps = {
  post: AuthoredPost;
};

function PostPreview(props: PostPreviewProps) {
  const { post } = props;

  return (
    <div className="post preview">
      <article className="post__main">
        <span className="post__category">{post.category}</span>

        <h1 className="post__title">{post.title}</h1>
        <div className="post__meta">
          <time className="post-age__meta-date">01.01.2025</time> |
          <span className="post__meta-info"> by {post.author}</span>
        </div>
      </article>

      <article className="post__display">
        <img
          src={post.display_img.url}
          alt="Cover image"
          className="post__display-img"
        />
        <span className="post__display-meta">
          Photo by {post.display_img.owner} from {post.display_img.source}
        </span>
      </article>

      <ReactMarkdown className="post__content">{post.content}</ReactMarkdown>

      {post.tags.length > 0 && (
        <section className="post__tags">
          <h3 className="post__tags-title">Tags</h3>

          <ul className="post__tags-list">
            {post.tags.map((tag) => (
              <li key={`tag-preview-${tag}`} className="post__tags-item">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default PostPreview;
