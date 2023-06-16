'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Header.scss';
import NavPanel from './NavPanel';

function Header() {
  const [isNavExpanded, setNavExpanded] = useState(false);

  const toggleNav = () => setNavExpanded((prevState) => !prevState);

  return (
    <header className="header">
      <div className="header__wrapper">
        <button
          className={`header-left ${isNavExpanded && 'active'}`}
          aria-haspopup
          aria-expanded={isNavExpanded}
          aria-controls="nav-panel"
          onClick={toggleNav}
        >
          <span className="header-left__label">Read</span>
          <div
            className="header-left__icon"
            data-expanded={isNavExpanded}
            aria-hidden
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="2.5 2.5 18 18"
              fill="none"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="header-left__arrow-icon"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>

        <h1 className="header-main">
          <Link href="/">Dezien</Link>
        </h1>

        <div className="header-right">
          <Link href="/account/login" className="header-right__login">
            Log in
          </Link>

          <button
            className="header-right__search"
            aria-haspopup
            aria-expanded={false}
            aria-controls="search-panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="-1 -3 24 24"
              fill="none"
              stroke="#000000"
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
      </div>

      {isNavExpanded && <NavPanel isExpanded={isNavExpanded} />}
    </header>
  );
}

export default Header;
