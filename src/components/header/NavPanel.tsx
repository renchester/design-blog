'use client';

import Link from 'next/link';
import Image from 'next/image';
import './NavPanel.scss';
import { useEffect, useRef } from 'react';

type NavPanelProps = {
  isExpanded: boolean;
  hideNav: () => void;
};

function NavPanel(props: NavPanelProps) {
  const { isExpanded, hideNav } = props;
  const panelRef = useRef<HTMLElement | null>(null);

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
          <li className="nav__article">
            {/* IMAGE HERE */}
            <Link className="nav__label" href="/category/art">
              Art
            </Link>
            <h2 className="nav__article-title">
              Best of 2023: Architecture, Reclamation, and Blobs
            </h2>
          </li>
          <li className="nav__article">
            {/* IMAGE HERE */}
            <Link className="nav__label" href="/category/architecture">
              Interiors
            </Link>
            <h2 className="nav__article-title">
              Best of 2023: Architecture, Reclamation, and Blobs
            </h2>
          </li>
        </ul>

        <div className="nav__columns">
          <h4 className="nav__label">Columns</h4>
          <ul className="nav__column-group">
            <li className="nav__column">Our team</li>
            <li className="nav__column">Circulars</li>
            <li className="nav__column">Deconstruction</li>
            <li className="nav__column">Destinations</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavPanel;
