'use client';

import { ReactNode, useEffect } from 'react';
import './Overlay.scss';

type OverlayProps = {
  children: ReactNode;
  hideChildren: () => void;
};

function Overlay(props: OverlayProps) {
  const { children, hideChildren } = props;

  useEffect(() => {
    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        hideChildren();
      }
    }

    window.addEventListener('keydown', escKeyListener);

    return () => window.removeEventListener('keydown', escKeyListener);
  }, [hideChildren]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Only run even when actual overlay is clicked
    if (e.target === e.currentTarget) {
      hideChildren();
    }
  };

  return (
    <div className="overlay" onClickCapture={handleClick}>
      {children}
    </div>
  );
}

export default Overlay;
