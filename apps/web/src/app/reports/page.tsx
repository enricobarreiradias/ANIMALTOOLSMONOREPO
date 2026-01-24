"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Paper, 
  Button, Select, MenuItem, FormControl, InputLabel, 
  Divider, Stack, LinearProgress, Chip, CircularProgress,
  Grid 
} from '@mui/material';
import { 
  Print, Download, FilterList, BarChart, 
  PieChart, Refresh 
} from '@mui/icons-material';
import { AnimalService, EvaluationService } from '../../services/api';

// --- TIPAGEM ---
interface ReportStats {
  general: {
    total: number;
    totalLesions: number;
    healthy: number;
    moderate: number;
    critical: number;
    healthyPercentage: string;
    moderatePercentage: string;
    criticalPercentage: string;
  };
  pathologies: Record<string, {
    label: string;
    count: number;
    key: string;
  }>;
}

export default function ReportsPage() {
  const router = useRouter();

  // Loading começa true para evitar flicker inicial
  const [loading, setLoading] = useState(true);
  
  const [filterFarm, setFilterFarm] = useState('all');
  const [filterClient, setFilterClient] = useState('all');
  const [period, setPeriod] = useState('30');
  
  const [farmOptions, setFarmOptions] = useState<string[]>([]);
  const [clientOptions, setClientOptions] = useState<string[]>([]);
  
  const [stats, setStats] = useState<ReportStats | null>(null);

  // Carregar Filtros
  useEffect(() => {
    AnimalService.getFarms().then(res => setFarmOptions(res.data)).catch(console.error);
    if (AnimalService.getClients) {
        AnimalService.getClients().then(res => setClientOptions(res.data)).catch(console.error);
    }
  }, []);

  // --- FUNÇÃO DE CARREGAMENTO ---
  // useCallback para manter a referência estável
  const loadReportData = useCallback(() => {
    // Definimos loading aqui dentro para ser seguro
    setLoading(true);

    // Adicionamos timestamp para evitar cache
    EvaluationService.getReportStats(filterFarm, filterClient)
      .then((response) => {
          setStats(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar relatório:', error);
      })
      .finally(() => {
          setLoading(false);
      });
  }, [filterFarm, filterClient]);

  // --- USE EFFECT ---
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReportData();
  }, [loadReportData]);

  // --- BOTÃO DE REFRESH ---
  const handleManualRefresh = () => {
    loadReportData();
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePathologyClick = (key: string) => {
    router.push(`/history?pathology=${key}&farm=${filterFarm}&client=${filterClient}`);
  };

  const pathologyList = stats ? Object.values(stats.pathologies).sort((a, b) => b.count - a.count) : [];
  
  const getPathologyColor = (index: number) => {
      const colors = ['#f59e0b', '#f97316', '#ef4444', '#b91c1c', '#3b82f6', '#6366f1'];
      return colors[index % colors.length];
  };

  if (loading && !stats) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (!stats) return <Box p={4}><Typography>Não foi possível carregar os dados.</Typography></Box>;

  return (
    <Box p={4} sx={{ '@media print': { p: 0 } }}>
      
      {/* HEADER */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={4}
        sx={{ '@media print': { display: 'none' } }}
      >
        <Box>
            <Typography variant="h4" fontWeight={800} color="primary">Relatórios Gerenciais</Typography>
            <Typography variant="body1" color="text.secondary">Análise populacional e saúde do rebanho</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
            {/* Botão de Atualizar */}
            <Button 
                variant="text" 
                color="primary" 
                startIcon={<Refresh />} 
                onClick={handleManualRefresh}
            >
                Atualizar Dados
            </Button>
            
            <Button variant="outlined" startIcon={<Download />} disabled>Exportar Word</Button>
            <Button variant="contained" startIcon={<Print />} onClick={handlePrint}>Imprimir PDF</Button>
        </Stack>
      </Box>

      {/* BARRA DE FILTROS */}
      <Paper 
        elevation={0} 
        variant="outlined" 
        sx={{ p: 2, mb: 4, bgcolor: '#f8fafc', '@media print': { display: 'none' } }}
      >
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Período</InputLabel>
                    <Select value={period} label="Período" onChange={(e) => setPeriod(e.target.value)}>
                        <MenuItem value="7">Últimos 7 dias</MenuItem>
                        <MenuItem value="30">Últimos 30 dias</MenuItem>
                        <MenuItem value="90">Últimos 3 Meses</MenuItem>
                        <MenuItem value="year">Este Ano</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Fazenda</InputLabel>
                    <Select value={filterFarm} label="Fazenda" onChange={(e) => setFilterFarm(e.target.value)}>
                        <MenuItem value="all">Todas as Fazendas</MenuItem>
                        {farmOptions.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Cliente</InputLabel>
                    <Select value={filterClient} label="Cliente" onChange={(e) => setFilterClient(e.target.value)}>
                        <MenuItem value="all">Todos os Clientes</MenuItem>
                        {clientOptions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
                <Button fullWidth variant="contained" color="inherit" startIcon={<FilterList />} onClick={handleManualRefresh}>
                    Filtrar
                </Button>
            </Grid>
        </Grid>
      </Paper>

      {/* --- ÁREA IMPRESSA --- */}
      <Paper elevation={3} sx={{ p: 5, minHeight: '100vh' }} id="report-area">
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5} pb={2} borderBottom="2px solid #eee">
            <Box>
                <Typography variant="h5" fontWeight={800} color="primary.main">LAUDO TÉCNICO POPULACIONAL</Typography>
                <Typography variant="caption" color="text.secondary">Gerado em: {new Date().toLocaleDateString()}</Typography>
            </Box>
            <Box textAlign="right">
                <Typography variant="subtitle2" fontWeight="bold">VirtualVet</Typography>
                <Typography variant="caption" display="block">Fazenda: {filterFarm === 'all' ? 'Consolidado Geral' : filterFarm}</Typography>
                <Typography variant="caption" display="block">Cliente: {filterClient === 'all' ? 'Consolidado Geral' : filterClient}</Typography>
            </Box>
        </Box>

        {/* KPIs Resumidos */}
        <Grid container spacing={3} mb={6}>
            <Grid size={{ xs: 4 }}>
                <Box p={2} bgcolor="#f1f5f9" borderRadius={2} textAlign="center">
                    <Typography variant="h3" fontWeight={800} color="primary">{stats.general.total}</Typography>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">ANIMAIS AVALIADOS</Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
                <Box p={2} bgcolor="#f0fdf4" borderRadius={2} textAlign="center">
                    <Typography variant="h3" fontWeight={800} color="success.main">{stats.general.healthyPercentage}%</Typography>
                    <Typography variant="caption" fontWeight="bold" color="success.dark">ÍNDICE DE SAÚDE</Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
                <Box p={2} bgcolor="#fff7ed" borderRadius={2} textAlign="center">
                    <Typography variant="h3" fontWeight={800} color="warning.main">{stats.general.totalLesions}</Typography>
                    <Typography variant="caption" fontWeight="bold" color="warning.dark">TOTAL DE LESÕES</Typography>
                </Box>
            </Grid>
        </Grid>

        <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom display="flex" alignItems="center" gap={1}>
                    <BarChart color="primary" /> Principais Patologias
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={3}>
                    {pathologyList.map((item, index) => {
                        const color = getPathologyColor(index);
                        return (
                            <Box 
                                key={item.key} 
                                onClick={() => handlePathologyClick(item.key)}
                                sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                            >
                                <Box display="flex" justifyContent="space-between" mb={0.5}>
                                    <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                                    <Typography variant="body2" fontWeight={700}>{item.count} casos</Typography>
                                </Box>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={stats.general.total ? (item.count / stats.general.total) * 100 : 0} 
                                    sx={{ 
                                        height: 10, 
                                        borderRadius: 5, 
                                        bgcolor: '#f1f5f9',
                                        '& .MuiLinearProgress-bar': { bgcolor: color }
                                    }} 
                                />
                            </Box>
                        );
                    })}
                    {pathologyList.length === 0 && <Typography variant="caption" color="text.secondary">Nenhuma patologia registrada.</Typography>}
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom display="flex" alignItems="center" gap={1}>
                    <PieChart color="primary" /> Distribuição de Severidade
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2} mt={4}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${stats.general.healthyPercentage}%`} color="success" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Animais Saudáveis (Sem intervenção)</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${stats.general.moderatePercentage}%`} color="warning" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Casos Moderados (Acompanhamento)</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${stats.general.criticalPercentage}%`} color="error" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Casos Críticos (Tratamento Imediato)</Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>

        <Box mt={10} pt={2} borderTop="1px solid #eee" textAlign="center">
            <Typography variant="caption" color="text.secondary">
                Documento gerado eletronicamente pelo sistema VirtualVet.
            </Typography>
        </Box>

      </Paper>
    </Box>
  );
}