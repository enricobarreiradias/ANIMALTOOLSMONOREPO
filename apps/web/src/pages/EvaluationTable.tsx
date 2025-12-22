import { useEffect, useState } from 'react';
import { 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Box, 
  Button 
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { api } from '../services/api';
import { EvaluationModal } from '../components/EvaluationModal';

// 1. Define o "formato" dos dados para evitar erro de 'any'
interface Evaluation {
  id: number;
  animalId: number; // ou o objeto animal completo, dependendo do backend
  createdAt: string;
  status?: string;
}

export default function EvaluationTable() {
  // 2. Tipamos o estado para parar de reclamar
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    api.get('/evaluation')
      .then((res) => { // O axios geralmente infere, mas se der erro use (res: any) temporariamente
        setEvaluations(res.data);
      })
      .catch((error) => console.error('Erro ao buscar avaliações:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {/* 3. Typography agora está importado */}
        <Typography variant="h4">Mesa de Avaliação</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setIsModalOpen(true)}
        >
          Nova Avaliação
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Animal (ID)</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Nenhuma avaliação encontrada</TableCell>
              </TableRow>
            ) : (
              // 4. Usamos a variável 'evaluations', resolvendo o erro "assigned but never used"
              evaluations.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.animalId}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>Pendente</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <EvaluationModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
}