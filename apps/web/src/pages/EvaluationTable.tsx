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
  Button,
  Chip
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { api } from '../services/api';
import { EvaluationModal } from '../components/EvaluationModal';

interface EvaluationData {
  id: string; 
  code: string;
  breed: string;
  lastEvaluationDate: string | null;
  media: string[];
}

export default function EvaluationTable() {
  const [evaluations, setEvaluations] = useState<EvaluationData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = () => {
    api.get('/evaluations/history')
      .then((res) => {
        // CORREÇÃO: Verifica se o retorno está dentro de 'data' (paginado) ou raiz
        const dataList = res.data.data ? res.data.data : res.data;
        
        if (Array.isArray(dataList)) {
            setEvaluations(dataList);
        } else {
            console.warn("Formato de resposta inesperado:", res.data);
            setEvaluations([]);
        }
      })
      .catch((error) => console.error('Erro ao carregar histórico:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Mesa de Avaliação
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setIsModalOpen(true)}
          sx={{ fontWeight: 'bold' }}
        >
          Nova Avaliação
        </Button>
      </Box>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Brinco (Tag)</strong></TableCell>
              <TableCell><strong>Raça</strong></TableCell>
              <TableCell><strong>Última Avaliação</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evaluations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    Nenhum histórico encontrado.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              evaluations.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.breed}</TableCell>
                  <TableCell>
                    {row.lastEvaluationDate 
                      ? new Date(row.lastEvaluationDate).toLocaleDateString('pt-BR') 
                      : 'Nunca avaliado'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={row.lastEvaluationDate ? "Avaliado" : "Pendente"} 
                      color={row.lastEvaluationDate ? "success" : "warning"} 
                      size="small" 
                    />
                  </TableCell>
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