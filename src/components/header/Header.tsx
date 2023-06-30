'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import './Header.scss';
import NavPanel from './NavPanel';
import useAuth from '@/hooks/useAuth';
import AccountMenu from './AccountMenu';
import SearchPanel from '../search/SearchPanel';
import Overlay from '../Overlay';

function Header() {
  const { user } = useAuth();

  const [isNavExpanded, setNavExpansion] = useState(false);
  const [isAccountMenuExpanded, setAccountMenuExpansion] = useState(false);
  const [isSearchPanelExpanded, setSearchPanelExpansion] = useState(false);

  // Navigation Panel handlers
  const toggleNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNavExpansion((prevState) => !prevState);
  };
  const hideNav = () => setNavExpansion(false);

  // Account Menu handlers
  const toggleAccountMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAccountMenuExpansion((prevState) => !prevState);
  };
  const hideAccountMenu = () => setAccountMenuExpansion(false);

  // Search Panel handlers
  const toggleSearchPanel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchPanelExpansion((prevState) => !prevState);
  };

  const hideSearchPanel = () => setSearchPanelExpansion(false);

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
          {user ? (
            <div className="header-right__account">
              <button
                type="button"
                className="header-right__img-btn"
                onClick={toggleAccountMenu}
                aria-haspopup
                aria-expanded={isAccountMenuExpanded}
                aria-controls="account-menu"
              >
                <Image
                  src="/logo.png"
                  width={14}
                  height={14}
                  alt="App logo"
                  className="header-right__img"
                />
              </button>

              {isAccountMenuExpanded && (
                <AccountMenu hideMenu={hideAccountMenu} />
              )}
            </div>
          ) : (
            <Link href="/account/login" className="header-right__login">
              Log in
            </Link>
          )}

          <button
            className="header-right__search"
            aria-haspopup
            aria-expanded={isSearchPanelExpanded}
            aria-controls="search-panel"
            onClick={toggleSearchPanel}
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

      {isNavExpanded && (
        <NavPanel isExpanded={isNavExpanded} hideNav={hideNav} />
      )}

      {isSearchPanelExpanded && (
        <Overlay hideChildren={hideSearchPanel}>
          <SearchPanel hidePanel={hideSearchPanel} />
        </Overlay>
      )}
    </header>
  );
}

export default Header;
