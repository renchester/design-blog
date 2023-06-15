import isLength from 'validator/lib/isLength';

const validatePassword = (password: string) => {
  if (isLength(password, { min: 6 })) {
    return true;
  } else throw new Error('Password must meet minimum length of 6 characters');
};

export default validatePassword;
