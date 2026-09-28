import type { User } from '../../../entities/user';

export type AuthResponse = {
  token: string;
  user: User;
};

export type CurrentUserResponse = {
  user: User;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
