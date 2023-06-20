import { axiosPrivate } from './axios';

/**
 * Requests for a new access token from the auth server using
 * the stored refresh token in the client. The request is already
 * configured to send with credentials.
 *
 * @returns a new token with format 'Bearer <token>' if request is valid
 */

const refreshToken = async () => {
  try {
    const response = await axiosPrivate.get('/auth/refresh');

    const newToken = response.data.accessToken;

    // Return new formatted token for subsequent requests
    return `Bearer ${newToken}` || null;
  } catch (err) {
    console.error(err);
  }
};
export default refreshToken;
