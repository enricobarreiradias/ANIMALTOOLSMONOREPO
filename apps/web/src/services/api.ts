import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// --- TIPOS (Interfaces Exportadas) ---
export interface Animal {
  id: string;
  tagCode: string;
  breed?: string;
  birthDate?: string;
}

export interface CreateEvaluationDto {
  animalId: string;
  evaluatorId: string;
  generalObservations?: string;
  toothPresence: boolean;
  toothFracture: number;
  crownReduction: number;
  vitrifiedBorder: number;
  lingualWear: number;
  pulpitis: number;
  pulpChamberExposure: number;
  dentalCalculus: number;
  abnormalColor: number;
  caries: number;
  gingivalRecession: number;
  periodontalLesions: number;
  gingivitisEdema: number;
  gingivitisColor: number;
}

// GARANTINDO O EXPORT DA INTERFACE EVALUATION
export interface Evaluation {
  id: string;
  animalId: string;
  evaluatorId: string;
  fractureLevel: string;
  isToothAbsent: boolean;
  pulpitis: boolean;
  createdAt: string;
  animal?: Animal;
}

export type PaginatedResponse<T> = T[] | { data: T[] };

// --- SERVIÇOS ---
export const AnimalService = {
  getAll: async () => {
    const res = await api.get('/animal');
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  },
  getOne: (id: string) => api.get<Animal>(`/animal/${id}`),
  
  // CORREÇÃO: Substituindo 'any' por tipos parciais do Animal
  create: (data: Omit<Animal, 'id'>) => api.post<Animal>('/animal', data),
  update: (id: string, data: Partial<Animal>) => api.patch<Animal>(`/animal/${id}`, data),
  
  delete: (id: string) => api.delete(`/animal/${id}`),
};

export const EvaluationService = {
  create: (data: CreateEvaluationDto) => api.post('/evaluations', data),
  getAll: () => api.get('/evaluations'),
};