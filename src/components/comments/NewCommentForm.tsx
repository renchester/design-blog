'use client';

import './NewCommentForm.scss';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useSnackbar from '@/hooks/useSnackbar';
import useComments from '@/hooks/useComments';
import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import { Comment } from '@/types/types';

type NewCommentFormProps = {
  hideForm: () => void;
  parentComment?: Comment;
};

function NewCommentForm(props: NewCommentFormProps) {
  const { hideForm, parentComment } = props;
  const { parentPost } = useComments();
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const axiosPrivate = useAxiosInterceptors();

  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `/api/posts/${parentPost._id}/comments`,
        { content: comment, parent_comment: parentComment },
      );

      if (response.status === 201) {
        addAlert({
          status: 'success',
          message: 'Successfully created comment.',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        addAlert({
          status: 'error',
          message: 'Failed to create comment.',
        });
      }
    }
  };

  if (!user) return null;

  return (
    <div
      id={`new-comment__${parentComment ? parentComment._id : parentPost._id}`}
      className=""
    >
      {parentComment && (
        <div>
          Replying to {parentComment.author.first_name}{' '}
          {parentComment.author.last_name}:
        </div>
      )}
      <form action="" onSubmit={handleSubmitComment}>
        <input
          type="text"
          name="comment"
          id="comment-input"
          onChange={handleCommentChange}
          value={comment}
        />
        <button type="submit">Submit</button>
      </form>

      <button onClick={hideForm}>Cancel</button>
    </div>
  );
}
export default NewCommentForm;
