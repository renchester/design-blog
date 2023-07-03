'use client';

import './NavPanel.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TitleOnlyPreview from '../blogPreview/TitleOnlyPreview';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import { BlogPost } from '@/types/types';
import { API_URL } from '@/config/config';
import useSnackbar from '@/hooks/useSnackbar';

type NavPanelProps = {
  isExpanded: boolean;
  hideNav: () => void;
};

function NavPanel(props: NavPanelProps) {
  const { isExpanded, hideNav } = props;
  const { addAlert } = useSnackbar();
  const panelRef = useRef<HTMLElement | null>(null);

  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function getTrendingPosts() {
      const response = await fetch(`${API_URL}/api/posts?limit=2`, {
        next: { revalidate: 86400 },
      });
      const data = await response.json();
      const posts = data.posts as BlogPost[];
      const formattedPosts = posts.map((post) => unescapeBlogPost(post));

      setTrendingPosts(formattedPosts);
    }

    try {
      getTrendingPosts();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }

      addAlert({ status: 'error', message: 'Unable to get trending posts' });
    }
  }, [addAlert]);

  useEffect(() => {
    // Global event listeners for hiding panel
    function globalClickListener(e: MouseEvent) {
      if (!panelRef.current?.contains(e.target as HTMLElement)) {
        hideNav();
      }
    }

    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') hideNav();
    }

    window.addEventListener('click', globalClickListener);
    window.addEventListener('keydown', escKeyListener);

    return () => {
      window.removeEventListener('click', globalClickListener);
      window.removeEventListener('keydown', escKeyListener);
    };
  }, [hideNav]);

  return (
    <motion.nav
      id="nav-panel"
      aria-hidden={isExpanded}
      className="nav"
      ref={panelRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, type: 'tween' }}
      exit={{ y: -100, opacity: 0 }}
    >
      <div className="nav__wrapper">
        <div className="nav__col-1">
          <h3 className="nav__label">Topics</h3>
          <ul className="nav__links">
            <li className="nav__link">
              <Link href="/category/architecture">Architecture</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/art">Art</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/interior-design">Interior Design</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/lifestyle">Lifestyle</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/style-fashion">Style + Fashion</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/tech">Tech</Link>
            </li>
            <li className="nav__link">
              <Link href="/category/travel">Travel</Link>
            </li>
          </ul>
        </div>
        <div className="nav__col-2">
          <ul className="nav__featured">
            {trendingPosts.length > 0 &&
              trendingPosts.map((post) => (
                <li
                  className="nav__featured-item"
                  key={`nav-panel__${post.slug}`}
                >
                  <TitleOnlyPreview blog={post} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
export default NavPanel;
