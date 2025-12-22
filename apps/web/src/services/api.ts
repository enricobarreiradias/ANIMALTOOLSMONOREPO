import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Sua API NestJS
});

// Interceptor para facilitar (opcional, mas bom ter)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);