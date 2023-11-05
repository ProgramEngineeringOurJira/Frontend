import {
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
    useMemo,
    useCallback,
  } from 'react';
  //import { useRouter } from 'next/navigation';
  import { toast } from 'react-hot-toast';
  
  import { User } from '../../services/profile/profile.service';
  import { LC_ACCESS_TOKEN, LC_REFRESH_TOKEN } from '../../utils/constants';
  import { useProfile } from '../../services/profile/profile.service';
  import { useLogin, useRegistration } from '../../services/auth/auth.service';
  
  import { AuthContext, AuthContextType, AuthFormFields } from './types';
  
  export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    //const router = useRouter();
  
    const {
      mutateAsync: loginAsync,
      //isLoading: isLoadingLogin,
      isSuccess: isLoginSuccess,
      error: loginError,
    } = useLogin();
  
    const {
      mutateAsync: registrationAsync,
      //isLoading: isLoadingReg,
      isSuccess: isRegSuccess,
    } = useRegistration();
  
    const { mutateAsync: getProfile, 
        //isLoading: isGetProfileLoading 
    } =
      useProfile({
        cb: (newUser: User) => {
          setUser(newUser);
        },
      });
  
    useEffect(() => {
      const accessToken = localStorage.getItem(LC_ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(LC_REFRESH_TOKEN);
      if (accessToken && refreshToken) {
        getProfile();
      }
    }, [getProfile]);
  
    useEffect(() => {
      if (isLoginSuccess || isRegSuccess) {
        getProfile();
      }
    }, [getProfile, isLoginSuccess, isRegSuccess]);
  
    //useEffect(() => {
    //  setIsLoading(isLoadingLogin || isLoadingReg || isGetProfileLoading);
    //}, [isGetProfileLoading, isLoadingLogin, isLoadingReg]);
  
    const login = useCallback(
      (fields: AuthFormFields, loginCb?: () => void) => {
        // не надо раскомментировать
        // setUser(userData);
        // localStorage.setItem(LC_USER, JSON.stringify(userData));
        const fieldsForLogin = {
          email: fields.email,
          password: fields.password,
        };
  
        toast
          .promise(loginAsync(fieldsForLogin), {
            error: 'Не удалось авторизоваться',
            loading: 'Загрузка...',
            success: 'Вы успешно авторизовались!',
          })
          .finally(() => {
            //router.refresh();
            if (loginCb) {
              loginCb();
            }
          });
      },
      [loginAsync, 
        //router
    ],
    );
  
    const register = useCallback(
      (fields: AuthFormFields) => {
        const fieldsForRegistration = {
          email: fields.email,
          password: fields.password,
        };
  
        toast
          .promise(registrationAsync(fieldsForRegistration), {
            error: 'Не удалось зарегистрироваться',
            loading: 'Регистрация...',
            success: 'Вы успешно зарегистрировались!',
          })
          .finally(() => {
            //router.refresh();
          });
      },
      [registrationAsync, 
        //router
    ],
    );
  
    const logout = useCallback(() => {
      setUser(null);
      localStorage.clear();
      //router.refresh();
    }, [
        //router
    ]);
  
    const hasUser = useMemo(() => {
      return user !== null;
    }, [user]);
  
    const contextValue: AuthContextType = useMemo(
      () => ({
        user,
        login,
        logout,
        register,
        hasUser,
        loginError,
        isLoading,
      }),
      [user, login, register, logout, hasUser, loginError, isLoading],
    );
  
    return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }