import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3333/api',
});

// --- NOVO: INTERCEPTOR DE REQUISIÇÃO (Coloca o Token) ---
api.interceptors.request.use((config) => {
  // Verifica se estamos no navegador antes de tentar acessar o localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- NOVO: INTERCEPTOR DE RESPOSTA (Trata Erro 401) ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica se a URL original não é a de login
    const isLoginRequest = error.config?.url?.includes('/auth/signin');

    if (error.response && error.response.status === 401 && !isLoginRequest) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/'; 
      }
    }
    return Promise.reject(error);
  }
);

interface CreateData {
  [key: string]: unknown;
}

// --- NOVO: AUTH SERVICE ---
export const AuthService = {
  login: (data: { email: string; password: string }) => api.post('/auth/signin', data),
  // Função útil para pegar os dados do user (opcional)
  me: () => api.get('/auth/test'),
};

export const AnimalService = {
  getAll: () => api.get('/animal'),
  getOne: (id: string) => api.get(`/animal/${id}`),
  create: (data: CreateData) => api.post('/animal', data),
  getFarms: () => api.get<string[]>('/animal/filters/farms'),
  getClients: () => api.get<string[]>('/animal/filters/clients'),

  sync: () => api.get('/animal/integration/sync'),
};

export const EvaluationService = {
  getPending: (page = 1, limit = 20, search = '', farm = '', client = '') => 
    api.get(`/evaluations/pending?page=${page}&limit=${limit}&search=${search}&filterFarm=${farm}&filterClient=${client}`),
  
  create: (data: CreateData) => api.post('/evaluations', data),
  
  getAllHistory: (page = 1, limit = 10, search = '', farm = '', client = '', pathology = '') => 
    api.get(`/evaluations/history?page=${page}&limit=${limit}&search=${search}&filterFarm=${farm}&filterClient=${client}&filterPathology=${pathology}`),

  getOne: (id: string) => api.get(`/evaluations/${id}`),
  getByAnimal: (animalId: string) => api.get(`/evaluations/animal/${animalId}`),
  update: (id: number, data: CreateData) => api.patch(`/evaluations/${id}`, data),

  applyQuickMoulting: (data: { animalId: string, stage: string, evaluatorId?: number }) => 
    api.post('/evaluations/quick-moulting', data),

  getReportStats: (
      farm?: string, 
      client?: string, 
      startDate?: string, 
      endDate?: string    
  ) => {
    const params = new URLSearchParams();
    if (farm && farm !== 'all') params.append('filterFarm', farm);
    if (client && client !== 'all') params.append('filterClient', client);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    return api.get(`/evaluations/reports/stats?${params.toString()}`);
  },

};