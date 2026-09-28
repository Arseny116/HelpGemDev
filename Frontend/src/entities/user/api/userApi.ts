import { client } from '../../../shared/api/client';
import type { User } from '../model/type';

export const userApi = {
    async getUser(id: string): Promise<User> {
        const { data } = await client.get<User>('/users', { params: { id } });
        return data;
    },

};