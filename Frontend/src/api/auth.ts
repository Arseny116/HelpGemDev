import { client, TOKEN_KEY } from './client';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/login', { email, password });
    return data;
  },

  async register(payload: RegisterData): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/users', { user: payload });
    return data;
  },

  async me(): Promise<{ user: User }> {
    const { data } = await client.get<{ user: User }>('/me');
    return data;
  },

  async logout(): Promise<void> {
    await client.delete('/logout');
  },
};

export { TOKEN_KEY };