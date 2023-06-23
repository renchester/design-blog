'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RedirectProps = {
  href: string;
};

function RedirectIfUser(props: RedirectProps) {
  const { href } = props;
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to href if user is logged in (to be used
    // primarily for the login and signup forms
    if (user) {
      setTimeout(() => router.push(href), 1000);
    }
  }, [user, router, href]);

  if (user) {
    return <p>You must be logged out to view this page...</p>;
  } else {
    return null;
  }
}

export default RedirectIfUser;
