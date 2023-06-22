'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RedirectProps = {
  href: string;
};

function RedirectIfNoUser(props: RedirectProps) {
  const { href } = props;
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Used in protected routes. Redirect to href if user
    // is not logged in
    if (!user) {
      setTimeout(() => router.push(href), 1000);
    }
  }, [router, user, href]);

  return <p>You must be logged in to view this page...</p>;
}
export default RedirectIfNoUser;
