import axios from 'axios';

import { getAccessToken, removeAccessToken } from '@/lib/authStorage';

const apiClient = axios.create({
  baseURL: process.env.BACKEND_API_URL || 'http://127.0.0.1:8050/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (request) => {
  const token = getAccessToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

apiClient.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    const normalizedError = {
      message: error.response?.data?.detail ?? error?.message ?? null,
      statusCode: error.response?.status ?? null,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
