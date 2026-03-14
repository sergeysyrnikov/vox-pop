import apiClient from '@/lib/axios';

export const userService = {
  getUser: async (id) => {
    try {
      const res = await apiClient.get(`/api/users/${id}/`);
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
};
