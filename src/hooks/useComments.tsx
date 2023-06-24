'use client';

import CommentContext from '@/context/CommentContext';
import { useContext } from 'react';

const useComments = () => {
  const context = useContext(CommentContext);

  if (context === null || context === undefined) {
    throw new Error('useComments must be used within the CommentProvider');
  }

  return context;
};

export default useComments;
