'use client';

import './LikePostButton.scss';
import useAuth from '@/hooks/useAuth';
import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import { BlogPost } from '@/types/types';
import { useState } from 'react';

type LikePostProps = {
  blog: BlogPost;
};

function LikePostButton(props: LikePostProps) {
  const { blog } = props;
  const { user } = useAuth();
  const axiosPrivate = useAxiosInterceptors();

  const initialLikedStatus = () => {
    if (!user) {
      return false;
    } else {
      return !!blog.liked_by.find((liker) => liker._id === user._id);
    }
  };

  const [isPostLiked, setPostLike] = useState(initialLikedStatus());
  const [likeAmount, setLikeAmount] = useState(blog.liked_by.length);

  const togglePostLike = async () => {
    try {
      const API_LIKE_URL = `/api/posts/${blog.slug}/likes`;

      if (isPostLiked) {
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

      setPostLike((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  if (!user) return null;

  return (
    <div className="btn-like">
      <button
        type="button"
        aria-label={`${isPostLiked ? 'Unlike' : 'Like'} post`}
        onClick={togglePostLike}
        className="btn-like__btn"
        data-liked={isPostLiked}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="var(--color-light-1)"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="btn-like__icon"
          aria-hidden
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span className="btn-like__label">
          {isPostLiked ? 'Liked' : 'Like post'}
        </span>
      </button>
      {likeAmount > 1 && (
        <p className="btn-like__join">
          Join the {likeAmount} people who like this post{' '}
        </p>
      )}
    </div>
  );
}

export default LikePostButton;
