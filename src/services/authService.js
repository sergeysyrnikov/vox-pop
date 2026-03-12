export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/api/auth/token/', { email, password });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('Invalid credentials');
  },
  register: async (email, password) => {
    const response = await apiClient.post('/api/auth/users/', { email, password });
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('Invalid credentials');
  },
};
