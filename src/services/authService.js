import apiClient from '@/lib/axios';

export const authService = {
  login: async (email, password) => {
    try {
      const res = await apiClient.post('/api/auth/token/', { email, password });
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  register: async (email, password) => {
    try {
      const res = await apiClient.post('/api/auth/users/', { email, password });
      if (res.status !== 201) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
};
