'use client';

import { useEffect, useRef, useState } from 'react';
import './SearchPanel.scss';
import Link from 'next/link';
import { BlogPost } from '@/types/types';
import unescapeBlogPost from '@/utils/unescapers/unescapeBlogPost';
import generatePostLink from '@/utils/generatePostLink';
import { API_URL } from '@/config/config';
import useSnackbar from '@/hooks/useSnackbar';

type SearchPanelProps = {
  hidePanel: () => void;
};

function SearchPanel(props: SearchPanelProps) {
  const { hidePanel } = props;
  const { addAlert } = useSnackbar();
  const panelRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState('');
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') hidePanel();
    }

    window.addEventListener('keydown', escKeyListener);

    return () => {
      window.removeEventListener('keydown', escKeyListener);
    };
  }, [hidePanel]);

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

  return (
    <div id="search-panel" className="search">
      <div className="search__top">
        <h1 className="search__label">Search</h1>
        <button className="search__btn-close" onClick={hidePanel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search__btn-close-icon"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="search__query-wrapper">
        <label htmlFor="query-input" hidden>
          Search for a post within Dezien
        </label>
        <input
          id="query-input"
          className="search__query-input"
          name="search"
          type="search"
          placeholder="I'm looking for ..."
          value={query}
          onChange={handleQueryChange}
        />
        <button className="search__btn-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="header-right__search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      <section
        className="search__trending"
        aria-labelledby="search__trending-articles"
      >
        <h3 id="search__trending-articles" className="search__trending-label">
          Trending Articles
        </h3>

        {trendingPosts.length > 0 && (
          <ul className="search__trending-list">
            {trendingPosts.map((post) => (
              <li
                className="search__trending-item"
                key={`search-panel__${post.slug}`}
              >
                <Link href={generatePostLink(post.slug)}>{post.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export default SearchPanel;
