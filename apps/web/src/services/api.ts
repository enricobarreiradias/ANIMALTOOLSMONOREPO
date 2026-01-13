import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3333/api', 
});

interface CreateData {
  [key: string]: unknown;
}

export const AnimalService = {
  getAll: () => api.get('/animal'),
  getOne: (id: string) => api.get(`/animal/${id}`),
  create: (data: CreateData) => api.post('/animal', data),
};

export const EvaluationService = {
  getPending: () => api.get('/evaluations/pending'),
  
  create: (data: CreateData) => api.post('/evaluations', data),
  
  getAllHistory: (page = 1, limit = 10) => 
    api.get(`/evaluations/history?page=${page}&limit=${limit}`),

  getOne: (id: string) => api.get(`/evaluations/${id}`),
};