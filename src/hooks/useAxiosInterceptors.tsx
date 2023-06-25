'use client';

import { axiosPrivate } from '@/lib/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import refresh from '@/lib/refreshToken';

const useAxiosInterceptors = () => {
  const { user, token, setToken } = useAuth();

  useEffect(() => {
    if (!user || !token) return;

    // Request interceptor. Attach token with format 'Bearer <token>' to the authorization header
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!token || !user) return config;

        if (!config.headers['Authorization']) {
          // Set authorization header to app token
          config.headers['Authorization'] = token;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Interceptor to check if access token is expired.
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // Return response if access token is valid
      (response) => response,

      // Runs when access token is expired
      async (error) => {
        const prevRequest = error?.config;

        // Expecting an expired access token
        if (error?.response?.status === 403 && !prevRequest.sent) {
          // Set a custom property to indicate a request has been sent to the server to refresh token
          prevRequest.sent = true;

          const newAccessToken = await refresh();

          if (!newAccessToken) {
            setToken(null);
            return;
          } else {
            setToken(newAccessToken);
          }

          // Sets the authorization header to the new access token
          prevRequest.headers['Authorization'] = newAccessToken;
          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      },
    );

    return () => {
      // Eject interceptors on unmount
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, token, setToken]);

  return axiosPrivate;
};

export default useAxiosInterceptors;
