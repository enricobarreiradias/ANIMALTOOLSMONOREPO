import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  IconButton, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, TextField, Typography, Tooltip 
} from '@mui/material';
import { Edit, Delete, Add, Pets } from '@mui/icons-material';
// Importação explícita de TIPO para evitar erros de compilação
import { AnimalService, type Animal } from '../services/api';

export default function AnimalManagement() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  
  const { register, handleSubmit, reset, setValue } = useForm<Animal>();

  // --- 1. FUNÇÃO PURA DE BUSCA (Não altera estado, apenas retorna dados) ---
  const fetchAnimalsData = async () => {
    try {
      const res = await AnimalService.getAll();
      const rawData = res.data as unknown; 
      
      let list: Animal[] = [];
      // Tratamento seguro para array simples ou paginado
      if (Array.isArray(rawData)) {
        list = rawData as Animal[];
      } else if (typeof rawData === 'object' && rawData !== null && 'data' in rawData) {
        list = (rawData as { data: Animal[] }).data;
      }
      return list;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return [];
    }
  };

  // --- 2. EFEITO DE CARREGAMENTO INICIAL (Com proteção de montagem) ---
  useEffect(() => {
    let isMounted = true;

    fetchAnimalsData().then((data) => {
      if (isMounted) {
        setAnimals(data);
      }
    });

    return () => { isMounted = false; };
  }, []); // Array vazio: roda apenas uma vez

  // --- 3. FUNÇÃO DE RECARGA MANUAL (Para usar após Salvar/Excluir) ---
  const reloadTable = async () => {
    const data = await fetchAnimalsData();
    setAnimals(data);
  };

  const handleOpen = (animal?: Animal) => {
    if (animal) {
      setEditingAnimal(animal);
      setValue('tagCode', animal.tagCode);
      setValue('breed', animal.breed);
      
      // Ajuste para o input de data (YYYY-MM-DD)
      if (animal.birthDate) {
        const dateStr = new Date(animal.birthDate).toISOString().split('T')[0];
        setValue('birthDate', dateStr);
      }
    } else {
      setEditingAnimal(null);
      reset();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingAnimal(null);
    reset();
  };

  const onSubmit = async (data: Animal) => {
    try {
      if (editingAnimal) {
        await AnimalService.update(editingAnimal.id, data);
        alert('Animal atualizado!');
      } else {
        await AnimalService.create(data);
        alert('Animal cadastrado!');
      }
      handleClose();
      reloadTable(); // Recarrega a tabela
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este animal do sistema?')) {
      try {
        await AnimalService.delete(id);
        reloadTable(); // Recarrega a tabela
      } catch (error) {
        console.error(error);
        alert('Erro ao excluir. Talvez ele tenha avaliações vinculadas?');
      }
    }
  };

  return (
    <div className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Gestão de Rebanho
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => handleOpen()}
          sx={{ fontWeight: 'bold', backgroundColor: 'var(--primary)' }}
        >
          Novo Animal
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
            <TableRow>
              <TableCell><strong>Brinco (Tag)</strong></TableCell>
              <TableCell><strong>Raça</strong></TableCell>
              <TableCell><strong>Nascimento</strong></TableCell>
              <TableCell align="right"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Pets sx={{ color: '#ccc', fontSize: 18 }} />
                    {row.tagCode}
                  </Box>
                </TableCell>
                <TableCell>{row.breed || '-'}</TableCell>
                <TableCell>{row.birthDate ? new Date(row.birthDate).toLocaleDateString('pt-BR') : '-'}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton onClick={() => handleOpen(row)} color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton onClick={() => handleDelete(row.id)} color="error">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {animals.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                  Nenhum animal cadastrado. Use o botão "Novo Animal".
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingAnimal ? `Editar ${editingAnimal.tagCode}` : 'Cadastrar Novo Animal'}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField 
                label="Código do Brinco (Tag)" 
                fullWidth 
                required 
                {...register('tagCode')} 
              />
              <TextField 
                label="Raça" 
                fullWidth 
                {...register('breed')} 
              />
              <TextField 
                label="Data de Nascimento" 
                type="date" 
                fullWidth 
                InputLabelProps={{ shrink: true }} 
                {...register('birthDate')} 
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}