'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { User } from '@/types/types';

import refreshToken from '@/lib/refreshToken';
import { axiosPrivate } from '@/lib/axios';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const getUserFromToken = (token: string) => {
    const decodedToken: any = jwtDecode(token);

    const user = decodedToken.user as User;

    return user;
  };

  /**
   * Sets the access token to app memory
   *
   * @param token -- the access token returned by the server after a request
   * has been made to the login route
   *
   */
  const login = (token: string) => {
    // Set appToken to issued access token
    const accessToken = `Bearer ${token}`;
    setToken(accessToken);
  };

  /**
   * Makes a call to the auth server to logout user and clear cookie from database.
   * Also sets the token to null
   */

  const logout = async () => {
    // Make call to API on logout route first
    await axiosPrivate.post('/auth/logout');

    // Set token to null on logout
    setToken(null);
  };

  /**
   * Initialize authentication on first load by requesting
   * an access token if refresh token is still valid,
   */
  const initializeAuth = async () => {
    const newToken = await refreshToken();

    if (!newToken) {
      setToken(null);
      return;
    }

    setToken(newToken);
  };

  // Initialize user and token on first app load
  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    console.log({ user, token });
  }, [user, token]);

  // Token listener, set app User to info from decoded token
  useEffect(() => {
    if (token === null) {
      setUser(null);
      return;
    }

    const extractedToken = token.split(' ')[1];
    const decodedUser = getUserFromToken(extractedToken);
    setUser(decodedUser);
  }, [token]);

  const value = { user, setUser, token, setToken, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
