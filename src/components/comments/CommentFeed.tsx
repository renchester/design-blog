'use client';

import './CommentFeed.scss';
import { Comment as CommentType } from '@/types/types';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm';
import { API_URL } from '@/config/config';
import unescapeComment from '@/utils/unescapers/unescapeComment';

type CommentFeedProps = {
  postSlug: string;
};

const getPostComments = async (slug: string) => {
  const response = await fetch(`${API_URL}/api/posts/${slug}/comments`, {
    cache: 'no-cache', // fetch fresh data for each request
  });
  const data = await response.json();

  const comments = data.comments as CommentType[];
  const formattedComments = comments.map((comment) => unescapeComment(comment));

  return formattedComments;
};

async function CommentFeed(props: CommentFeedProps) {
  const { postSlug } = props;
  const comments = await getPostComments(postSlug);

  const topLevelComments = comments.filter(
    (comment) => comment.comment_level === 1 && !comment.parent_comment_id,
  );

  return (
    <div className="comment-sec">
      <NewCommentForm />
      {topLevelComments.length > 0 ? (
        topLevelComments.map((comment) => (
          <Comment key={`cm-${comment._id}`} comment={comment} />
        ))
      ) : (
        <p className="comment-sec__empty">This post has no comments yet...</p>
      )}
    </div>
  );
}
export default CommentFeed;
