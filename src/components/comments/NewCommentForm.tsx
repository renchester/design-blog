'use client';

import './NewCommentForm.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useSnackbar from '@/hooks/useSnackbar';
import useComments from '@/hooks/useComments';
import useAxiosInterceptors from '@/hooks/useAxiosInterceptors';
import { Comment } from '@/types/types';

type NewCommentFormProps = {
  hideForm?: () => void;
  parentComment?: Comment;
};

function NewCommentForm(props: NewCommentFormProps) {
  const { hideForm, parentComment } = props;
  const router = useRouter();
  const { parentPost } = useComments();
  const { user } = useAuth();
  const { addAlert } = useSnackbar();
  const axiosPrivate = useAxiosInterceptors();

  const [comment, setComment] = useState('');
  const sectionID = `new-comment__${
    parentComment ? parentComment._id : parentPost._id
  }`;

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const response = await axiosPrivate.post(
        `/api/posts/${parentPost.slug}/comments`,
        { content: comment, parent_comment: parentComment },
      );

      if (response.status === 201) {
        addAlert({
          status: 'success',
          message: 'Successfully created comment.',
        });

        router.refresh();

        setComment('');
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

  if (!user)
    return (
      <p className="new-comment__no-user">
        You must be logged in to add a comment.
      </p>
    );

  return (
    <section
      id={sectionID}
      className="new-comment"
      data-has-parent={!!parentComment}
    >
      <h4 id={sectionID} className="new-comment__title">
        {parentComment
          ? `Replying to ${parentComment.author.first_name}
          ${parentComment.author.last_name}`
          : `Commenting on post '${parentPost.title}'`}
      </h4>
      <form
        action=""
        onSubmit={handleSubmitComment}
        className="new-comment__form"
      >
        <label htmlFor="comment-input" hidden>
          Type out your comment
        </label>
        <textarea
          id="comment-input"
          name="comment"
          placeholder="Enter your comment here"
          className="new-comment__textarea"
          onChange={handleCommentChange}
          value={comment}
          minLength={2}
          required
        />
        <div className="new-comment__btn-container">
          <button
            type="submit"
            className="new-comment__btn submit"
            disabled={comment.length < 2}
          >
            Submit
          </button>
          {hideForm && (
            <button
              onClick={hideForm}
              type="button"
              className="new-comment__btn cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
export default NewCommentForm;
