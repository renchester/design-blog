import { BlogPost } from '@/types/types';
import unescape from 'validator/lib/unescape';
import unescapeUser from './unescapeUser';
import unescapeComment from './unescapeComment';

const unescapeBlogPost = (post: BlogPost) => {
  const processedPost: BlogPost = {
    ...post,
    title: unescape(post.title),
    author: unescapeUser(post.author),
    editors: post.editors.map((editor) => unescapeUser(editor)),
    content: unescape(post.content),
    comments: post.comments.map((comment) => unescapeComment(comment)),
    tags: post.tags.map((tag) => unescape(tag)),
    display_img: {
      url: unescape(post.display_img.url),
      owner: unescape(post.display_img.owner),
      source: unescape(post.display_img.source),
    },
  };

  return processedPost;
};

export default unescapeBlogPost;
