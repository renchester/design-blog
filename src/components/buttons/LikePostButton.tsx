'use client';

import './LikePostButton.scss';
import useAuth from '@/hooks/useAuth';
import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import useSnackbar from '@/hooks/useSnackbar';
import { BlogPost, User } from '@/types/types';
import { useEffect, useState } from 'react';

type LikePostProps = {
  blog: BlogPost;
};

function LikePostButton(props: LikePostProps) {
  const { blog } = props;
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const axiosPrivate = useAxiosInterceptors();

  const [isPostLiked, setPostLike] = useState(false);
  const [likeAmount, setLikeAmount] = useState(blog.liked_by.length);

  const API_LIKE_URL = `/api/posts/${blog.slug}/likes`;

  const togglePostLike = async () => {
    try {
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

  useEffect(() => {
    async function getUserLikeStatus() {
      if (!user) {
        setPostLike(false);
        return;
      }

      const response = await axiosPrivate.get(`/api/posts/${blog.slug}/likes`);
      const liked_by = response.data.likes as User[];

      setPostLike(!!liked_by?.find((liker) => liker._id === user?._id));
    }

    try {
      getUserLikeStatus();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      addAlert({ status: 'error', message: 'Unable to get post likes' });
    }
  }, [user, addAlert, axiosPrivate, blog.slug, API_LIKE_URL]);

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
      {likeAmount > 1 && isPostLiked ? (
        <p className="btn-like__join">Thank you for liking this post</p>
      ) : (
        <p className="btn-like__join">
          Join the {likeAmount} people who like this post
        </p>
      )}
    </div>
  );
}

export default LikePostButton;
