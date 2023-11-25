import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useState,
  } from 'react';
  
  type LogInContextProps = {
    user: UserT | null;
    isAuth: boolean;
    token: string;
    setIsAuth: (i: boolean) => void;
    setAccessToken: (token: string) => void;
    clearAll: () => void;
    setNewUser: (user: UserT) => void;
  };
  
  export type UserT = {
    email: string;
    password: string;
  };
  
  export const AuthContext = createContext<LogInContextProps>(
    {} as LogInContextProps
  );
  
  export const LogInProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserT | null>(null);
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
  
    const setNewUser = useCallback((newUser: UserT) => {
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
          setNewUser: setNewUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };