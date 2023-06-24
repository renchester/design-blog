'use client';

import { BlogPost, Comment as CommentType } from '@/types/types';
import { ReactNode, createContext, useState } from 'react';

type CommentContextType = {
  parentPost: BlogPost; // | undefined;
  parentComment: CommentType | null;
  setParentComment: React.Dispatch<React.SetStateAction<CommentType | null>>;
};

type CommentProviderProps = {
  children: ReactNode;
  parentPost: BlogPost;
};

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentProvider = (props: CommentProviderProps) => {
  const { parentPost, children } = props;

  const [parentComment, setParentComment] = useState<CommentType | null>(null);

  const value: CommentContextType = {
    parentPost,
    parentComment,
    setParentComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export default CommentContext;
