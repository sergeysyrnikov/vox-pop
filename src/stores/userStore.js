import { create } from 'zustand';
import { authService } from '@/services/authService';

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchCurrentUser: async () => {
    set({ isLoading: true, error: null });
    const res = await authService.getCurrentUser();
    if (res.ok) {
      console.log(res.data);
      set({ user: res.data, isLoading: false });
    } else {
      set({ error: res.data, isLoading: false });
    }
  },
  clearUserError: () => set({ error: null }),
}));
