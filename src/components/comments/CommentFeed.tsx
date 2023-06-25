'use client';

import './CommentFeed.scss';
import { Comment as CommentType } from '@/types/types';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';

type CommentFeedProps = {
  comments: CommentType[];
};

function CommentFeed(props: CommentFeedProps) {
  const { comments } = props;

  const topLevelComments = comments.filter(
    (comment) => comment.comment_level === 1 && !comment.parent_comment_id,
  );

  return (
    <div className="comment-sec">
      <NewCommentForm />
      {topLevelComments.map((comment) => (
        <Comment key={`cm-${comment._id}`} comment={comment} />
      ))}
    </div>
  );
}
export default CommentFeed;
