'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '@/types/types';
import addDays from 'date-fns/addDays';

type AuthContextType = {
  user: User | null;
  token: string | null;
  tokenExpiration: string | null;
  login: (token: string, tokenExpiration: string, user: User) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token') || null,
  );
  const [tokenExpiration, setTokenExpiration] = useState<string | null>(
    () => localStorage.getItem('tokenExpiration') || null,
  );

  const login = (token: string, tokenExpiration: string, userObj: User) => {
    // Set local store expiration to the issued JWT expiration
    const numDays = Number.parseInt(tokenExpiration);
    const expiresAt = addDays(new Date(), numDays);

    setToken(token);
    localStorage.setItem('token', token);

    setTokenExpiration(expiresAt.toString());
    localStorage.setItem('tokenExpiration', JSON.stringify(expiresAt));

    setUser({
      username: userObj.username,
      email: userObj.email,
      first_name: userObj.first_name,
      last_name: userObj.last_name,
      _id: userObj._id,
    });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');

    setTokenExpiration(null);
    localStorage.removeItem('tokenExpiration');

    setUser(null);
  };

  useEffect(() => {
    // If current date is later than expiry,
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, token, tokenExpiration }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null || context === undefined) {
    throw new Error('useAuth must be used within the AuthProvider');
  }

  return context;
};
