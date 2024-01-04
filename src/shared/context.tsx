import axios from '../api/http-common.ts';
import { createContext, FC, PropsWithChildren, useCallback, useState } from 'react';
import { User } from '../utils/types';

type LogInContextProps = {
  user: User | null;
  isAuth: boolean;
  token: string;
  setIsAuth: (i: boolean) => void;
  setAccessToken: (token: string) => void;
  clearAll: () => void;
  setNewUser: (user: User) => void;
};

export const AuthContext = createContext<LogInContextProps>({} as LogInContextProps);

export const LogInProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('');

  const setAuth = useCallback((i: boolean) => setIsAuth(i), [setIsAuth]);

  const clearAll = useCallback(() => {
    setToken('');
    localStorage.clear();
    setIsAuth(false);
  }, []);

  const setTokenAccess = (token: string) => {
    setToken(token);
    window.localStorage.setItem('access_token', token);
  };

  const setNewUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        token,
        setIsAuth: setAuth,
        setAccessToken: setTokenAccess,
        clearAll: clearAll,
        setNewUser: setNewUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
