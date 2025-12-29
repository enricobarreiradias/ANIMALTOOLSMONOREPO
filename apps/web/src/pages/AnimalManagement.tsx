import { useEffect, useState, useMemo } from 'react';
import { 
  Box, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, TextField, InputAdornment, IconButton, Tooltip,
  CircularProgress
} from '@mui/material';
import { Search, History, Assignment } from '@mui/icons-material';
import { AnimalService, type Animal } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AnimalManagement() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 1. CARREGAMENTO DE DADOS (Corrigido)
  // Movemos a lógica para dentro do useEffect para evitar dependências cíclicas e satisfazer o linter
  useEffect(() => {
    let isMounted = true;

    const fetchAnimals = async () => {
      try {
        const res = await AnimalService.getAll();
        // Tratamento seguro dos dados recebidos
        const rawData = res.data as unknown; 
        let list: Animal[] = [];
        
        if (Array.isArray(rawData)) {
          list = rawData as Animal[];
        } else if (typeof rawData === 'object' && rawData !== null && 'data' in rawData) {
          list = (rawData as { data: Animal[] }).data;
        }
        
        if (isMounted) {
          setAnimals(list || []);
        }
      } catch (error) {
        console.error("Erro ao carregar rebanho", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnimals();

    return () => { isMounted = false; };
  }, []);

  // 2. LÓGICA DE FILTRO (Corrigido)
  // Substituímos o useEffect + useState por useMemo (Estado Derivado)
  // Isso elimina o erro "Calling setState synchronously within an effect"
  const filteredAnimals = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return animals.filter(animal => 
        animal.tagCode.toLowerCase().includes(lowerSearch) || 
        (animal.breed && animal.breed.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, animals]);

  return (
    <div className="fade-in">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Consulta de Rebanho
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Localize animais para visualizar histórico ou status. O cadastro é realizado via integração.
        </Typography>
      </Box>

      {/* BARRA DE PESQUISA */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Digite o número do brinco ou raça..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search sx={{ color: '#999' }} />
                    </InputAdornment>
                ),
            }}
            sx={{ bgcolor: '#f9f9f9' }}
        />
      </Paper>

      {/* TABELA DE RESULTADOS */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f4f6f8' }}>
            <TableRow>
              <TableCell><strong>Identificação (Brinco)</strong></TableCell>
              <TableCell><strong>Raça</strong></TableCell>
              <TableCell><strong>Nascimento</strong></TableCell>
              <TableCell align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
               <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                      <CircularProgress size={24} sx={{ mr: 2 }} />
                      <Typography variant="caption" color="textSecondary">Carregando...</Typography>
                  </TableCell>
               </TableRow>
            ) : filteredAnimals.length > 0 ? (
              filteredAnimals.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Typography fontWeight="bold" color="#1565c0">{row.tagCode}</Typography>
                  </TableCell>
                  <TableCell>{row.breed || '-'}</TableCell>
                  <TableCell>{row.birthDate ? new Date(row.birthDate).toLocaleDateString('pt-BR') : '-'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Histórico">
                        <IconButton onClick={() => navigate('/history')} size="small" sx={{ mr: 1 }}>
                            <History fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Nova Avaliação">
                        <IconButton onClick={() => navigate(`/evaluate/${row.id}`)} size="small" color="primary">
                            <Assignment fontSize="small" />
                        </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                        <Typography color="textSecondary">
                            {searchTerm ? `Nenhum animal encontrado para "${searchTerm}"` : "Nenhum animal cadastrado."}
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}