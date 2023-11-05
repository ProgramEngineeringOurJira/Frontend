import { createContext } from 'react';

import { User } from '../../services/profile/profile.service';

export type AuthFormFields = {
  email: string;
  password: string;
};

export interface AuthContextType {
  user: User | null;
  login: (userData: AuthFormFields, cb?: () => void) => void;
  register: (userData: AuthFormFields, cb?: () => void) => void;
  logout: () => void;
  loginError: unknown;
  hasUser: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);