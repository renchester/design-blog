'use client';

import { useState } from 'react';
import Link from 'next/link';
import './Header.scss';
import NavPanel from './NavPanel';

function Header() {
  const [isNavExpanded, setNavExpanded] = useState(false);

  const toggleNav = () => setNavExpanded((prevState) => !prevState);

  return (
    <>
      <header className="header">
        <button
          className="left"
          aria-haspopup
          aria-expanded={isNavExpanded}
          aria-controls="nav-panel"
          onClick={toggleNav}
        >
          <span className={`left__label ${isNavExpanded && 'active'}`}>
            Nav
          </span>
          <div aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="left__arrow-icon"
              data-expanded={isNavExpanded}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>

        <h1 className="main">
          <Link href="/">Dezien</Link>
        </h1>

        <div className="right">
          <Link href="/account/login" className="right__login">
            Login
          </Link>

          <button
            className="right__search"
            aria-haspopup
            aria-expanded={false}
            aria-controls="search-panel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="right__search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </header>

      {isNavExpanded && <NavPanel isExpanded={isNavExpanded} />}
    </>
  );
}

export default Header;
