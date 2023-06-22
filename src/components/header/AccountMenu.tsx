'use client';

import { useEffect, useRef } from 'react';
import './AccountMenu.scss';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AccountMenuProps = {
  hideMenu: () => void;
};

function AccountMenu(props: AccountMenuProps) {
  const { hideMenu } = props;
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  useEffect(() => {
    // Global event listeners for hiding menu
    function globalClickListener(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as HTMLElement)) {
        hideMenu();
      }
    }

    function escKeyListener(e: KeyboardEvent) {
      if (e.key === 'Escape') hideMenu();
    }

    window.addEventListener('click', globalClickListener);
    window.addEventListener('keydown', escKeyListener);

    return () => {
      window.removeEventListener('click', globalClickListener);
      window.removeEventListener('keydown', escKeyListener);
    };
  }, [hideMenu]);

  if (!user) return null;

  return (
    <div id="account-menu" className="acc-menu">
      <h2 className="acc-menu__welcome">
        {user.first_name} {user.last_name}
      </h2>

      <ul role="menu" className="acc-menu__list">
        <li className="acc-menu__item">
          <Link href="/settings">Settings</Link>
        </li>
        <li className="acc-menu__item">Dark Mode</li>
        <li className="acc-menu__item">Account</li>
        <li className="acc-menu__item">
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
export default AccountMenu;
