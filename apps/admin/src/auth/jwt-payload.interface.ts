export interface JwtPayload {
  email: string;
  // Podes adicionar 'sub' (subject) se quiseres guardar o ID também:
  sub?: number; 
}
