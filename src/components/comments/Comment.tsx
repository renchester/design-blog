'use client';

import './Comment.scss';
import { Comment as CommentType } from '@/types/types';
import { useState } from 'react';
import Link from 'next/link';
import format from 'date-fns/format';
import unescape from 'validator/lib/unescape';
import useAuth from '@/hooks/useAuth';
import NewCommentForm from './NewCommentForm';
import useComments from '@/hooks/useComments';

type CommentProps = {
  comment: CommentType;
};

function Comment(props: CommentProps) {
  const { comment } = props;
  const { user } = useAuth();
  const { parentPost } = useComments();

  const allComments = parentPost.comments;

  const initialLikedStatus = () => {
    if (!user) {
      return false;
    } else {
      return !!comment.liked_by.find(
        (commentLiker) => commentLiker._id === user._id,
      );
    }
  };

  const [isFormExpanded, setFormExpanded] = useState(false);
  const [areChildrenExpanded, setChildrenExpanded] = useState(true);
  const [isLiked, setLikedStatus] = useState(initialLikedStatus);

  // Get children of "this" comment
  const childComments = allComments.filter(
    (currComment) => currComment.parent_comment_id === comment._id,
  );

  const formattedDate = format(comment.date_created, 'LLLL dd, yyyy');

  const toggleReplyForm = () => setFormExpanded((prev) => !prev);
  const hideReplyForm = () => setFormExpanded(false);

  const addCommentLike = () => {
    setLikedStatus(true);
  };

  const removeCommentLike = () => {
    setLikedStatus(false);
  };

  return (
    <article className="comment">
      <h4 aria-label="Comment author" className="comment__author">
        <Link href={`/user/${comment.author.username}`}>
          {unescape(comment.author.first_name)}{' '}
          {unescape(comment.author.last_name)}
        </Link>
      </h4>

      <time
        className="comment__date"
        dateTime={comment.date_created.toString()}
      >
        {formattedDate}
      </time>

      <p className="comment__content">{unescape(comment.content)}</p>

      <div className="comment__interactions">
        <button
          aria-label="Like comment"
          onClick={isLiked ? removeCommentLike : addCommentLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isLiked ? 'var(--color-primary)' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{comment.liked_by.length}</span>
        </button>
        <button onClick={toggleReplyForm} aria-controls="">
          {isFormExpanded ? 'Hide' : 'Reply'}
        </button>
      </div>

      {isFormExpanded && (
        <NewCommentForm hideForm={hideReplyForm} parentComment={comment} />
      )}

      {areChildrenExpanded &&
        childComments.length > 0 &&
        childComments.map((cm) => (
          <Comment key={`cm__${cm._id}`} comment={cm} />
        ))}
    </article>
  );
}
export default Comment;
