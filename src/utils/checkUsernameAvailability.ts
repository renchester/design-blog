import axios, { AxiosError } from 'axios';

const checkUsernameAvailability = async (username: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get(
      `${API_URL}/api/users/username/${username}`,
    );

    if (response.status === 200) {
      throw new Error('Username is already in use');
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      // User does not exist yet
      return true;
    }

    if (error instanceof Error) {
      // Throw error message
      throw error;
    }
  }
};

export default checkUsernameAvailability;
