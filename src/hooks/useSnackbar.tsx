'use client';

import SnackbarContext from '@/context/SnackbarContext';
import { useContext } from 'react';

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === null || context === undefined) {
    throw new Error('useSnackbar must be used within the SnackbarProvider');
  }

  return context;
};

export default useSnackbar;
