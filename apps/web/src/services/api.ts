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
  getPending: (page = 1, limit = 20, search = '', farm = '') => 
    api.get(`/evaluations/pending?page=${page}&limit=${limit}&search=${search}&filterFarm=${farm}`),
  
  create: (data: CreateData) => api.post('/evaluations', data),
  
  getAllHistory: (page = 1, limit = 10, search = '') => 
    api.get(`/evaluations/history?page=${page}&limit=${limit}&search=${search}`),

  getOne: (id: string) => api.get(`/evaluations/${id}`),
  getByAnimal: (animalId: string) => api.get(`/evaluations/animal/${animalId}`),
  update: (id: number, data: CreateData) => api.patch(`/evaluations/${id}`, data),

  applyQuickMoulting: (data: { animalId: string, stage: string, evaluatorId?: number }) => 
    api.post('/evaluations/quick-moulting', data),

};