"use client";

import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, 
  TextField, InputAdornment, Chip, Button, Avatar, CircularProgress, 
  Stack, Alert, IconButton, Tooltip
} from '@mui/material';
import { 
  Search, Visibility, Edit, 
  Warning, CheckCircle, AccessTime 
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
  isCritical: boolean;
}

export default function HistoryPage() {
  const router = useRouter();
  
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [total, setTotal] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Paginação
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]); 

  const loadHistory = async () => {
    setLoading(true);
    try {

      const response = await EvaluationService.getAllHistory(page + 1, rowsPerPage);
      
      setHistoryData(response.data.data || []);
      setTotal(response.data.meta.total || 0);
      
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar histórico de avaliações.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleEdit = (item: HistoryItem) => {
    router.push(`/evaluate/${item.animalId}`);
  };

  const displayData = historyData.filter(item => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                {/* Nota: Esse contador de críticos agora mostra apenas os da PÁGINA ATUAL */}
                <Box>
                    <Typography variant="caption" fontWeight="bold" color="error">CRÍTICOS (PÁG)</Typography>
                    <Typography variant="h5" fontWeight={800} color="error">
                        {historyData.filter(h => h.isCritical).length}
                    </Typography>
                </Box>
            </Stack>
        </Paper>
      </Box>

      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <TextField
            fullWidth
            placeholder="Filtrar nesta página..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>),
            }}
            size="small"
            helperText="Nota: A busca filtra apenas os itens visíveis nesta página."
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
                                        {row.isCritical ? (
                                            <Chip 
                                                icon={<Warning />} 
                                                label="Crítico / Tratamento" 
                                                color="error" 
                                                size="small" 
                                                sx={{ fontWeight: 'bold' }}
                                            />
                                        ) : (
                                            <Chip 
                                                icon={<CheckCircle />} 
                                                label="Saudável / Leve" 
                                                color="success" 
                                                size="small" 
                                                variant="outlined"
                                            />
                                        )}
                                        {row.worstFracture > 0 && (
                                            <Typography variant="caption" display="block" color="text.secondary" mt={0.5}>
                                                Maior Fratura: Score {row.worstFracture}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Tooltip title="Visualizar Detalhes">
                                                <IconButton 
                                                    size="small" 
                                                    color="primary"
                                                    onClick={() => handleEdit(row)}
                                                >
                                                    <Visibility />
                                                </IconButton>
                                            </Tooltip>
                                            <Button 
                                                variant="contained" 
                                                size="small" 
                                                startIcon={<Edit />}
                                                onClick={() => handleEdit(row)}
                                                sx={{ borderRadius: 20, textTransform: 'none' }}
                                            >
                                                Editar
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">Nenhuma avaliação encontrada nesta página.</Typography>
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