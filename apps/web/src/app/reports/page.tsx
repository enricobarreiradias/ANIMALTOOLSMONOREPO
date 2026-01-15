"use client";

import { useState } from 'react';
import { 
  Box, Typography, Paper, Grid, 
  Button, Select, MenuItem, FormControl, InputLabel, 
  Divider, Stack, LinearProgress, Chip 
} from '@mui/material';
import { 
  Print, Download, FilterList, BarChart, 
  PieChart 
} from '@mui/icons-material';

// --- DADOS MOCKADOS (Para validar com o Tiago) ---
const MOCK_STATS = {
  totalAnalyzed: 142,
  averageAge: 32, // meses
  healthIndex: 85, // % de saudáveis
  pathologies: [
    { label: 'Cálculo Dentário', value: 45, color: '#f59e0b' },
    { label: 'Desgaste Excessivo', value: 30, color: '#f97316' },
    { label: 'Fraturas', value: 15, color: '#ef4444' },
    { label: 'Periodontite', value: 10, color: '#b91c1c' },
  ],
  severity: {
    none: 65,
    moderate: 25,
    severe: 10
  }
};

export default function ReportsPage() {
  const [filterFarm, setFilterFarm] = useState('all');
  const [period, setPeriod] = useState('30');
  const [filterClient, setfilterClient] = useState('all');

  // Função simples para simular impressão
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box p={4} sx={{ '@media print': { p: 0 } }}>
      
      {/* HEADER (Não sai na impressão) */}
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
            <Button variant="outlined" startIcon={<Download />}>Exportar Documento Word</Button>
            <Button variant="outlined" startIcon={<Download />}>Exportar PDF</Button>
            <Button variant="contained" startIcon={<Print />} onClick={handlePrint}>Imprimir PDF</Button>
        </Stack>
      </Box>

      {/* BARRA DE FILTROS (Não sai na impressão) */}
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
                        <MenuItem value="Santa Fe">Santa Fé</MenuItem>
                        <MenuItem value="Ouro Verde">Ouro Verde</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="small">
                    <InputLabel>Cliente</InputLabel>
                    <Select value={filterClient} label="Cliente" onChange={(e) => setfilterClient(e.target.value)}>
                        
                        <MenuItem value="all">Todos os Clientes</MenuItem>
                        <MenuItem value="Cliente A">Cliente A</MenuItem>
                        <MenuItem value="Cliente B">Cliente B</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
                <Button fullWidth variant="contained" color="inherit" startIcon={<FilterList />}>Filtrar</Button>
            </Grid>
        </Grid>
      </Paper>

      {/* --- ÁREA IMPRESSA (O Relatório Real) --- */}
      <Paper elevation={3} sx={{ p: 5, minHeight: '100vh' }} id="report-area">
        
        {/* Cabeçalho do Documento */}
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
                    <Typography variant="h3" fontWeight={800} color="primary">{MOCK_STATS.totalAnalyzed}</Typography>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">ANIMAIS AVALIADOS</Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
                <Box p={2} bgcolor="#f0fdf4" borderRadius={2} textAlign="center">
                    <Typography variant="h3" fontWeight={800} color="success.main">{MOCK_STATS.healthIndex}%</Typography>
                    <Typography variant="caption" fontWeight="bold" color="success.dark">ÍNDICE DE SAÚDE</Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 4 }}>
                <Box p={2} bgcolor="#fff7ed" borderRadius={2} textAlign="center">
                    <Typography variant="h3" fontWeight={800} color="warning.main">{MOCK_STATS.averageAge}</Typography>
                    <Typography variant="caption" fontWeight="bold" color="warning.dark">IDADE MÉDIA (MESES)</Typography>
                </Box>
            </Grid>
        </Grid>

        <Grid container spacing={6}>
            
            {/* Gráfico 1: Distribuição de Problemas */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom display="flex" alignItems="center" gap={1}>
                    <BarChart color="primary" /> Principais Patologias
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Stack spacing={3}>
                    {MOCK_STATS.pathologies.map((item) => (
                        <Box key={item.label}>
                            <Box display="flex" justifyContent="space-between" mb={0.5}>
                                <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                                <Typography variant="body2" fontWeight={700}>{item.value} casos</Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={(item.value / MOCK_STATS.totalAnalyzed) * 100} 
                                sx={{ 
                                    height: 10, 
                                    borderRadius: 5, 
                                    bgcolor: '#f1f5f9',
                                    '& .MuiLinearProgress-bar': { bgcolor: item.color }
                                }} 
                            />
                        </Box>
                    ))}
                </Stack>
            </Grid>

            {/* Gráfico 2: Severidade */}
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom display="flex" alignItems="center" gap={1}>
                    <PieChart color="primary" /> Distribuição de Severidade
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2} mt={4}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${MOCK_STATS.severity.none}%`} color="success" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Animais Saudáveis (Sem intervenção)</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${MOCK_STATS.severity.moderate}%`} color="warning" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Casos Moderados (Acompanhamento)</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip label={`${MOCK_STATS.severity.severe}%`} color="error" sx={{ minWidth: 60, fontWeight: 'bold' }} />
                        <Typography variant="body2">Casos Críticos (Tratamento Imediato)</Typography>
                    </Box>
                </Stack>
            </Grid>
        </Grid>

        {/* Rodapé do Relatório */}
        <Box mt={10} pt={2} borderTop="1px solid #eee" textAlign="center">
            <Typography variant="caption" color="text.secondary">
                Documento gerado eletronicamente pelo sistema Animal Tools.
            </Typography>
        </Box>

      </Paper>
    </Box>
  );
}