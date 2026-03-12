import apiClient from '@/lib/axios';

export const surveyService = {
  getSurveys: async () => await apiClient.get('/api/surveys'),
  getSurvey: async (id) => await apiClient.get(`/api/surveys/${id}`),
  createSurvey: async (survey) => await apiClient.post('/api/surveys', survey),
  updateSurvey: async (id, survey) => await apiClient.put(`/api/surveys/${id}`, survey),
  deleteSurvey: async (id) => await apiClient.delete(`/api/surveys/${id}`),
};
