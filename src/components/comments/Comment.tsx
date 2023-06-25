'use client';

import './Comment.scss';
import { Comment as CommentType } from '@/types/types';
import { useState } from 'react';
import Link from 'next/link';
import format from 'date-fns/format';
import unescape from 'validator/lib/unescape';

import NewCommentForm from './NewCommentForm';
import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import useAuth from '@/hooks/useAuth';
import useComments from '@/hooks/useComments';

type CommentProps = {
  comment: CommentType;
};

function Comment(props: CommentProps) {
  const { comment } = props;
  const axiosPrivate = useAxiosInterceptors();
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
  const [likeAmount, setLikeAmount] = useState(comment.liked_by.length);

  // Get children of "this" comment
  const childComments = allComments.filter(
    (currComment) => currComment.parent_comment_id === comment._id,
  );

  const formattedDate = format(comment.date_created, 'LLLL dd, yyyy');

  // Reply Form Togglers
  const toggleReplyForm = () => setFormExpanded((prev) => !prev);
  const hideReplyForm = () => setFormExpanded(false);

  // Comment Like Handlers
  const toggleCommentLike = async () => {
    try {
      const API_LIKE_URL = `/api/posts/${parentPost.slug}/comments/${comment._id}/likes`;

      if (isLiked) {
        const response = await axiosPrivate.delete(API_LIKE_URL);

        if (response.data.success) {
          setLikeAmount((prev) => Math.max(prev - 1, 0));
        }
      } else {
        const response = await axiosPrivate.post(API_LIKE_URL);

        if (response.data.success) {
          setLikeAmount((prev) => prev + 1);
        }
      }

      setLikedStatus((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  // Child Comment Togglers
  const toggleChildrenExpansion = () => setChildrenExpanded((prev) => !prev);

  const levelStyles = {
    marginLeft: comment.comment_level > 1 ? '0.5rem' : '0',
  };

  return (
    <div className="comment" style={levelStyles}>
      <article className="comment__self">
        <div className="comment__top">
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

          {childComments.length > 0 && (
            <button
              className="comment__btn-expand"
              aria-label={`${
                areChildrenExpanded ? 'Collapse' : 'Show'
              } child comments`}
              aria-expanded={areChildrenExpanded}
              onClick={toggleChildrenExpansion}
            >
              <svg
                className="comment__btn-expand-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                data-expanded={areChildrenExpanded}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>

        <p className="comment__content">{unescape(comment.content)}</p>

        <div className="comment__interactions">
          <button
            aria-label={`${isLiked ? 'Remove' : 'Add'} like on comment`}
            onClick={toggleCommentLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isLiked ? 'var(--color-primary)' : 'none'}
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="comment__like-amount">{likeAmount}</span>
          </button>
          <button
            onClick={toggleReplyForm}
            aria-haspopup
            aria-expanded={isFormExpanded}
            aria-controls={`new-comment__${comment._id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 16l-6-6 6-6" />
              <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
            </svg>

            <span>{isFormExpanded ? 'Hide' : 'Reply'}</span>
          </button>
        </div>
      </article>

      {isFormExpanded && (
        <NewCommentForm hideForm={hideReplyForm} parentComment={comment} />
      )}

      {areChildrenExpanded &&
        childComments.length > 0 &&
        childComments.map((cm) => (
          <Comment key={`cm__${cm._id}`} comment={cm} />
        ))}
    </div>
  );
}
export default Comment;
