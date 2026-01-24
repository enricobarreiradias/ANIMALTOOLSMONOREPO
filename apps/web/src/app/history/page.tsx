"use client";

import { useEffect, useState, useCallback } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, 
  TextField, InputAdornment, Chip, Button, Avatar, CircularProgress, 
  Stack, Alert, IconButton, Tooltip
} from '@mui/material';
import { 
  Search, Visibility, Edit, 
  Warning, CheckCircle, AccessTime, Error as ErrorIcon
} from '@mui/icons-material';
import { EvaluationService } from '../../services/api';

interface HistoryItem {
  id: string;
  animalId: string;
  code: string;
  breed: string;
  lastEvaluationDate: string;
  media: string[];
  worstFracture: number;
  status: 'HEALTHY' | 'MODERATE' | 'CRITICAL';
}

export default function HistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [total, setTotal] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Paginação e Filtros Locais
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Função de carregamento (Memoizada para evitar loops)
  const loadHistory = useCallback(async () => {
    setLoading(true);
    
    // Lemos os filtros diretamente da URL aqui dentro para garantir frescor
    const urlPathology = searchParams.get('pathology') || '';
    const urlFarm = searchParams.get('farm') || '';
    const urlClient = searchParams.get('client') || '';

    try {
      const response = await EvaluationService.getAllHistory(
          page + 1, 
          rowsPerPage, 
          searchTerm, 
          urlFarm, 
          urlClient, 
          urlPathology
      );
      
      setHistoryData(response.data.data || []);
      setTotal(response.data.meta.total || 0);
      
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar histórico de avaliações.');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchTerm, searchParams]); // Adicionado searchParams como dependência

  // Dispara o carregamento quando algo muda
  useEffect(() => {
    loadHistory();
  }, [loadHistory]); 

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleEdit = (item: HistoryItem) => {
    router.push(`/evaluate/${item.animalId}?source=history`);
  };

  const clearPathologyFilter = () => {
      router.push('/history'); // Remove os parametros da URL
  };

  // Filtro visual extra (opcional, já que o backend filtra)
  const displayData = historyData;

  const activePathology = searchParams.get('pathology');

  return (
    <Box sx={{ p: 4, width: '100%' }}>
      
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
            <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>
              Histórico de Laudos
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Consulte e edite avaliações já realizadas.
            </Typography>
        </Box>
        
        <Paper sx={{ p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
            <Stack direction="row" spacing={3}>
                <Box>
                    <Typography variant="caption" fontWeight="bold">TOTAL REGISTROS</Typography>
                    <Typography variant="h5" fontWeight={800}>{total}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" fontWeight="bold" color="error">CRÍTICOS (PÁG)</Typography>
                    <Typography variant="h5" fontWeight={800} color="error">
                        {historyData.filter(h => h.status === 'CRITICAL').length}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
      </Box>

      {/* AVISO DE FILTRO ATIVO */}
      {activePathology && (
          <Alert severity="info" sx={{ mb: 3 }} onClose={clearPathologyFilter}>
              Filtrando por patologia: <strong>{activePathology.toUpperCase()}</strong>. Mostrando apenas animais afetados.
          </Alert>
      )}

      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <TextField
            fullWidth
            placeholder="Buscar por brinco ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
            }}
            size="small"
        />
      </Paper>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        {loading ? (
            <Box p={5} display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : error ? (
            <Box p={3}><Alert severity="error">{error}</Alert></Box>
        ) : (
            <>
                <Table>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Animal</TableCell>
                            <TableCell>Raça</TableCell>
                            <TableCell align="center">Diagnóstico Rápido</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayData.length > 0 ? (
                            displayData.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <AccessTime fontSize="small" color="action" />
                                            <Typography variant="body2">
                                                {new Date(row.lastEvaluationDate).toLocaleDateString('pt-BR')}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar src={row.media[0]} variant="rounded" sx={{ width: 40, height: 40 }}>
                                                {row.code.substring(0,2)}
                                            </Avatar>
                                            <Typography fontWeight="bold">{row.code}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={row.breed} size="small" variant="outlined" />
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        {row.status === 'CRITICAL' && (
                                            <Chip icon={<ErrorIcon />} label="Crítico / Tratamento" color="error" variant="filled" size="small" sx={{ fontWeight: 'bold' }} />
                                        )}
                                        {row.status === 'MODERATE' && (
                                            <Chip icon={<Warning />} label="Moderado / Atenção" color="warning" variant="filled" size="small" sx={{ fontWeight: 'bold', color: '#fff' }} />
                                        )}
                                        {(row.status === 'HEALTHY' || !row.status) && (
                                            <Chip icon={<CheckCircle />} label="Saudável / Leve" color="success" variant="outlined" size="small" sx={{ fontWeight: 'bold', borderWidth: 2 }} />
                                        )}
                                    </TableCell>

                                    <TableCell align="center">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Tooltip title="Visualizar Detalhes">
                                                <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Button variant="contained" size="small" startIcon={<Edit />} onClick={() => handleEdit(row)} sx={{ borderRadius: 20, textTransform: 'none' }}>
                                                Editar
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">
                                        {activePathology 
                                            ? `Nenhum animal encontrado com ${activePathology}.` 
                                            : "Nenhuma avaliação encontrada."}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={total} 
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Linhas:"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                />
            </>
        )}
      </TableContainer>
    </Box>
  );
}