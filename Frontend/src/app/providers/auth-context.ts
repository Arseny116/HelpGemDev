import { createContext } from 'react';
import type { User } from '../../entities/user';
import type { RegisterData } from '../../features/auth/model/types';

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);