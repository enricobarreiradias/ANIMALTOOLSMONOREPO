"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TablePagination, 
  TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, 
  Chip, Button, Avatar, CircularProgress, 
  Stack, Alert, Divider, Grid 
} from '@mui/material';
import { Search, FilterList, CheckCircle, Pets, ArrowForward } from '@mui/icons-material';
import { EvaluationService } from '../../services/api';

interface ApiAnimalResponse {
  id: string;
  code: string;
  breed: string;
  media: string[];
  farm?: string;
  client?: string;
  entryDate?: string;
}

export default function PendingEvaluationsPage() {
  const router = useRouter();
  
  const [animals, setAnimals] = useState<ApiAnimalResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterFarm, setFilterFarm] = useState('all');
  const [filterClient, setFilterClient] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await EvaluationService.getPending();

      setAnimals(response.data);
    } catch (err) {
      console.error(err);
      setError('Falha ao carregar lista de animais pendentes.');
    } finally {
      setLoading(false);
    }
  };

  const filteredAnimals = useMemo(() => {
    return animals.filter(animal => {
      const matchesSearch = animal.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFarm = filterFarm === 'all' || animal.farm === filterFarm;
      const matchesClient = filterClient === 'all' || animal.client === filterClient;
      return matchesSearch && matchesFarm && matchesClient;
    });
  }, [animals, searchTerm, filterFarm, filterClient]);

  const paginatedAnimals = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAnimals.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAnimals, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => { setPage(newPage); };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEvaluate = (id: string) => { router.push(`/evaluate/${id}`); };

  const uniqueFarms = Array.from(new Set(animals.map(a => a.farm).filter(Boolean)));
  const uniqueClients = Array.from(new Set(animals.map(a => a.client).filter(Boolean)));

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Box mb={4} display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" gap={2}>
        <Box>
            <Typography variant="h4" fontWeight={800} color="primary" gutterBottom>Mesa de Avaliação</Typography>
            <Typography variant="body1" color="text.secondary">Gerencie e avalie os animais pendentes de laudo técnico.</Typography>
        </Box>
        <Paper elevation={0} sx={{ p: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9', borderRadius: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
                <Box textAlign="center">
                    <Typography variant="caption" fontWeight="bold" color="primary">PENDENTES</Typography>
                    <Typography variant="h4" fontWeight={800} color="primary">{filteredAnimals.length}</Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box textAlign="center">
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">TOTAL DO LOTE</Typography>
                    <Typography variant="h6" fontWeight={800} color="text.secondary">{animals.length}</Typography>
                </Box>
            </Stack>
        </Paper>
      </Box>

      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
                <TextField fullWidth placeholder="Buscar por brinco / ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search color="action" /></InputAdornment>) }} size="small" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Filtrar Fazenda</InputLabel>
                    <Select value={filterFarm} label="Filtrar Fazenda" onChange={(e) => setFilterFarm(e.target.value)}>
                        <MenuItem value="all">Todas as Fazendas</MenuItem>
                        {uniqueFarms.map(farm => <MenuItem key={farm as string} value={farm as string}>{farm}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Filtrar Cliente</InputLabel>
                    <Select value={filterClient} label="Filtrar Cliente" onChange={(e) => setFilterClient(e.target.value)}>
                        <MenuItem value="all">Todos os Clientes</MenuItem>
                        {uniqueClients.map(client => <MenuItem key={client as string} value={client as string}>{client}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
                 <Button fullWidth variant="outlined" onClick={() => {setSearchTerm(''); setFilterFarm('all'); setFilterClient('all')}} startIcon={<FilterList />} color="inherit">Limpar</Button>
            </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {loading ? ( <Box p={5} display="flex" justifyContent="center"><CircularProgress /></Box> ) : error ? ( <Box p={3}><Alert severity="error">{error}</Alert></Box> ) : (
            <>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Identificação (ID)</TableCell>
                            <TableCell>Raça</TableCell>
                            <TableCell>Origem (Fazenda)</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell align="center">Ação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedAnimals.length > 0 ? (
                            paginatedAnimals.map((row) => (
                                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell><Avatar src={row.media[0]} variant="rounded" sx={{ width: 56, height: 56, border: '1px solid #eee' }}><Pets /></Avatar></TableCell>
                                    <TableCell>
                                        <Typography fontWeight="bold" variant="body1">{row.code}</Typography>
                                        <Typography variant="caption" color="text.secondary">Entrada: {row.entryDate || '-'}</Typography>
                                    </TableCell>
                                    <TableCell><Chip label={row.breed} size="small" variant="outlined" /></TableCell>
                                    {/* Exibe o dado real ou um placeholder se vier vazio */}
                                    <TableCell>{row.farm || 'Não informada'}</TableCell>
                                    <TableCell>{row.client || 'Não informado'}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" color="primary" endIcon={<ArrowForward />} onClick={() => handleEvaluate(row.id)} size="small" sx={{ borderRadius: 20, px: 3 }}>Avaliar</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={6} align="center" sx={{ py: 6 }}><Box display="flex" flexDirection="column" alignItems="center" color="text.secondary"><CheckCircle sx={{ fontSize: 60, mb: 1, color: '#e0e0e0' }} /><Typography variant="h6">Tudo limpo!</Typography><Typography variant="body2">Não há animais pendentes com esses filtros.</Typography></Box></TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination rowsPerPageOptions={[5, 10, 25, 50]} component="div" count={filteredAnimals.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} labelRowsPerPage="Animais por página:" labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`} />
            </>
        )}
      </TableContainer>
    </Box>
  );
}