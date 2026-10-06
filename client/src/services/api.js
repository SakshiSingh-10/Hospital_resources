import axios from 'axios';

const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careflow_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) {
      localStorage.setItem('careflow_token', data.token);
      localStorage.setItem('careflow_user', JSON.stringify(data.user));
    }
    return data;
  },
  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('careflow_token', data.token);
      localStorage.setItem('careflow_user', JSON.stringify(data.user));
    }
    return data;
  },
  getMe: async () => (await api.get('/auth/me')).data,
  logout: () => {
    localStorage.removeItem('careflow_token');
    localStorage.removeItem('careflow_user');
  }
};

export const hospitalAPI = {
  getSummary: async () => (await api.get('/hospitals/summary')).data
};

export const predictionAPI = {
  generateForecast: async (payload) => (await api.post('/predictions/forecast', payload)).data
};

export const simulationAPI = {
  runSimulation: async (payload) => (await api.post('/simulation', payload)).data
};

export const patientAPI = {
  list: async (params) => (await api.get('/patients', { params })).data,
  create: async (patient) => (await api.post('/patients', patient)).data,
  update: async (id, changes) => (await api.patch(`/patients/${id}`, changes)).data
};

export const bedAPI = {
  list: async () => (await api.get('/beds')).data,
  create: async (bed) => (await api.post('/beds', bed)).data,
  update: async (id, changes) => (await api.patch(`/beds/${id}`, changes)).data
};

export const staffAPI = {
  list: async () => (await api.get('/staff')).data,
  create: async (staff) => (await api.post('/staff', staff)).data,
  update: async (id, changes) => (await api.patch(`/staff/${id}`, changes)).data
};

export const alertAPI = {
  list: async () => (await api.get('/alerts')).data,
  resolve: async (id) => (await api.patch(`/alerts/${id}/resolve`)).data
};

export const analyticsAPI = {
  getSummary: async () => (await api.get('/analytics')).data
};

export default api;
