import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

// 1. Definimos o tipo do Animal baseado na sua Entidade real
interface Animal {
  id: number;
  tagCode: string;
  animalIdentifier?: string; // O '?' indica que pode ser nulo
  breed?: string;
}

interface EvaluationFormData {
  animalId: number;
  description: string;
  score: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EvaluationModal({ open, onClose, onSuccess }: Props) {
  const { register, handleSubmit, reset } = useForm<EvaluationFormData>();
  
  // 2. Trocamos o <any[]> por <Animal[]>
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    if (open) {
      api.get('/animals')
        .then((res) => setAnimals(res.data))
        .catch(console.error);
    }
  }, [open]);

  const onSubmit = async (data: EvaluationFormData) => {
    try {
      await api.post('/evaluation', data);
      alert('Avaliação salva com sucesso!');
      reset(); 
      onSuccess(); 
      onClose(); 
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar. Verifique o console.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Avaliação</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <TextField
            select
            label="Selecione o Animal (Brinco/Tag)"
            defaultValue=""
            {...register('animalId', { required: true })}
            fullWidth
          >
            {animals.map((animal) => (
              <MenuItem key={animal.id} value={animal.id}>
                {/* 3. Ajustado para exibir o Código do Brinco ou Identificador */}
                {animal.tagCode} {animal.animalIdentifier ? `(${animal.animalIdentifier})` : ''}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Descrição / Obs"
            multiline
            rows={3}
            {...register('description')}
            fullWidth
          />
          
          <TextField
            label="Nota (1-5)"
            type="number"
            {...register('score', { valueAsNumber: true })}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}