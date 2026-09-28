import { client, TOKEN_KEY } from '../../../shared/api/client';
import type { AuthResponse, CurrentUserResponse, RegisterData } from '../model/types';

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/login', { email, password });
    return data;
  },

  async register(payload: RegisterData): Promise<AuthResponse> {
    const { data } = await client.post<AuthResponse>('/users', { user: payload });
    return data;
  },

  async me(): Promise<CurrentUserResponse> {
    const { data } = await client.get<CurrentUserResponse>('/me');
    return data;
  },

  async logout(): Promise<void> {
    await client.delete('/logout');
  },
};

export { TOKEN_KEY };