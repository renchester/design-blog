'use client';

import '../../app/post/[slug]/PostPage.scss';
import ReactMarkdown from 'react-markdown';
import format from 'date-fns/format';
import { type AuthoredPost } from './CreatePost';

type PostPreviewProps = {
  post: AuthoredPost;
};

function PostPreview(props: PostPreviewProps) {
  const { post } = props;

  return (
    <div className="post-page">
      <article className="post-page__main">
        <span className="post-page__category">{post.category}</span>

        <h1 className="post-page__title">{post.title}</h1>
        <div className="post-page__meta">
          <time className="post-age__meta-date">01.01.2000</time> |
          <span className="post-page__meta-info"> by {post.author}</span>
        </div>
      </article>

      <article className="post-page__display">
        <img
          src={post.display_img.url}
          alt="Cover image"
          className="post-page__display-img"
        />
        <span className="post-page__display-meta">
          Photo by {post.display_img.owner} from {post.display_img.source}
        </span>
      </article>

      <ReactMarkdown className="post-page__content">
        {post.content}
      </ReactMarkdown>

      {post.tags.length > 0 && (
        <section className="post-page__tags">
          <h3 className="post-page__tags-title">Tags</h3>

          <ul className="post-page__tags-list">
            {post.tags.map((tag) => (
              <li key={`tag-preview-${tag}`} className="post-page__tags-item">
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
