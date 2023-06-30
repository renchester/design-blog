import { Comment } from '@/types/types';
import unescape from 'validator/lib/unescape';
import unescapeUser from './unescapeUser';

const unescapeComment = (comment: Comment) => {
  const processedComment: Comment = {
    ...comment,
    author: unescapeUser(comment.author) || comment.author,
    content: unescape(comment.content),
  };

  return processedComment;
};

export default unescapeComment;
