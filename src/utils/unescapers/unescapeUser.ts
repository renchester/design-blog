import { User } from '@/types/types';
import unescape from 'validator/lib/unescape';

const unescapeUser = (user: User) => {
  if (!user) return;

  // For unpopulated users
  if (typeof user === 'string') {
    return user;
  }

  const processedUser: User = {
    ...user,
    first_name: unescape(user.first_name),
    last_name: unescape(user.last_name),
  };

  return processedUser;
};

export default unescapeUser;
