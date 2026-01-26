"use client";

import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, CircularProgress 
} from '@mui/material';
import { HistoryEdu, Person, Delete, Edit, AddCircle } from '@mui/icons-material';
import { api } from '../../services/api'; 

// Define o tipo
interface Log {
  id: number;
  action: string;
  entity: string;
  details: string;
  createdAt: string;
  user?: { fullName: string; email: string };
}

export default function AuditPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chamada direta para ganhar tempo (podes mover para api.ts depois)
    api.get('/audit')
      .then(res => setLogs(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Helper para ícones
  const getIcon = (action: string) => {
      if (action.includes('CREATE')) return <AddCircle color="success" fontSize="small" />;
      if (action.includes('DELETE') || action.includes('REMOVE')) return <Delete color="error" fontSize="small" />;
      if (action.includes('UPDATE')) return <Edit color="warning" fontSize="small" />;
      return <HistoryEdu color="action" fontSize="small" />;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>
        Logs de Auditoria
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Rastreabilidade de ações críticas no sistema.
      </Typography>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        {loading ? (
           <Box p={5} display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Responsável</TableCell>
                <TableCell>Ação</TableCell>
                <TableCell>Alvo</TableCell>
                <TableCell>Detalhes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell sx={{ fontSize: '0.85rem' }}>
                    {new Date(log.createdAt).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Person fontSize="small" color="disabled" />
                        <Typography variant="body2" fontWeight="bold">
                            {log.user?.fullName || 'Sistema/Removido'}
                        </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                        icon={getIcon(log.action)} 
                        label={log.action} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={log.entity} size="small" color="default" />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
              {logs.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                          Nenhum registro de auditoria encontrado.
                      </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}