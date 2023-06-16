import isLength from 'validator/lib/isLength';
import isAlphanumeric from 'validator/lib/isAlphanumeric';

const validateUsername = (username: string) => {
  const isCorrectLength = isLength(username, { max: 30, min: 6 });

  const isCorrectFormat = isAlphanumeric(username, 'en-US', { ignore: '-_' });

  if (!isCorrectLength) {
    throw new Error('Username must be between 6 and 30 characters');
  } else if (!isCorrectFormat) {
    throw new Error(
      'Username must only include underscores, dashes, or alphanumeric characters',
    );
  } else if (isCorrectFormat && isCorrectLength) {
    return true;
  } else return false;
};
export default validateUsername;
