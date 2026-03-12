import apiClient from '@/lib/axios';

export const surveyService = {
  getSurveys: async () => {
    const response = await apiClient.get('/api/surveys');
    return response.data;
  },
  getSurvey: async (id) => {
    const response = await apiClient.get(`/api/surveys/${id}`);
    return response.data;
  },
  createSurvey: async (survey) => {
    const response = await apiClient.post('/api/surveys', survey);
    return response.data;
  },
  updateSurvey: async (id, survey) => {
    const response = await apiClient.put(`/api/surveys/${id}`, survey);
    return response.data;
  },
  deleteSurvey: async (id) => {
    const response = await apiClient.delete(`/api/surveys/${id}`);
    return response.data;
  },
};
