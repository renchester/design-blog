'use client';

import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};

export default useAuth;
