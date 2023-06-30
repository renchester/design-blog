'use client';

import './NavPanel.scss';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import TitleOnlyPreview from '../blogPreview/TitleOnlyPreview';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import { BlogPost } from '@/types/types';

type NavPanelProps = {
  isExpanded: boolean;
  hideNav: () => void;
};

function NavPanel(props: NavPanelProps) {
  const { isExpanded, hideNav } = props;
  const panelRef = useRef<HTMLElement | null>(null);

  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function getTrendingPosts() {
      const response = await axios.get(`/api/posts?limit=2`);
      const posts = response.data.posts as BlogPost[];
      const formattedPosts = posts.map((post) => unescapeBlogPost(post));

      setTrendingPosts(formattedPosts);
    }

    getTrendingPosts();
  }, []);

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
    <nav id="nav-panel" aria-hidden={isExpanded} className="nav" ref={panelRef}>
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
    </nav>
  );
}
export default NavPanel;
