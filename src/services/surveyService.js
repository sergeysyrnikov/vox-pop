import apiClient from '@/lib/axios';

export const surveyService = {
  getSurveys: async (page) => {
    try {
      const res = await apiClient.get('/api/surveys', {
        params: {
          page,
        },
      });
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  getSurvey: async (id) => {
    try {
      const res = await apiClient.get(`/api/surveys/${id}`);
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  createSurvey: async (survey) => {
    try {
      const res = await apiClient.post('/api/surveys', survey);
      if (res.status !== 200 && res.status !== 201) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  updateSurvey: async (id, survey) => {
    try {
      const res = await apiClient.put(`/api/surveys/${id}`, survey);
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
  deleteSurvey: async (id) => {
    try {
      const res = await apiClient.delete(`/api/surveys/${id}`);
      if (res.status !== 200 && res.status !== 204) {
        return { ok: false, data: res.data, statusCode: res.status };
      }
      return { ok: true, data: res.data, statusCode: res.status };
    } catch (error) {
      return { ok: false, data: error };
    }
  },
};
