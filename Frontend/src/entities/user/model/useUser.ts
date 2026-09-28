import { useUserStore } from './store';
export const useUser = () => useUserStore((state) => state.user);