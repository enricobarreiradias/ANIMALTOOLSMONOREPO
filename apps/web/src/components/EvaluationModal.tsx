import { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  Button, 
  DialogActions, 
  MenuItem,
  Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

// Tipagem correta baseada no retorno do 'findAll' de animais
interface Animal {
  id: number;
  tagCode: string;
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

// ID fixo do Avaliador criado pelo SEED do backend
const DEFAULT_EVALUATOR_ID = "d290f1ee-6c54-4b01-90e6-d701748f0851";

export function EvaluationModal({ open, onClose, onSuccess }: Props) {
  const { register, handleSubmit, reset } = useForm<EvaluationFormData>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      // FIX: Removemos o setErrorMsg(null) síncrono daqui para evitar o erro de render
      
      // ROTA CORRIGIDA: '/animal' (singular)
      api.get('/animal')
        .then((res) => {
          setAnimals(res.data);
          setErrorMsg(null); // CORREÇÃO: Limpamos o erro aqui, após receber os dados
        })
        .catch((err) => {
          console.error(err);
          setErrorMsg("Erro ao carregar lista de animais.");
        });
    }
  }, [open]);

  // Função auxiliar para fechar e limpar o formulário
  const handleClose = () => {
    reset();
    setErrorMsg(null);
    onClose();
  };

  const onSubmit = async (data: EvaluationFormData) => {
    try {
      // TRADUÇÃO DE DADOS (Frontend Simplificado -> Backend Robusto)
      const payload = {
        animalId: data.animalId,
        evaluatorId: DEFAULT_EVALUATOR_ID,
        
        // Mapeia a nota e descrição para o campo de observações gerais
        generalObservations: `${data.description} (Nota Geral: ${data.score})`,

        // Valores Clínicos Padrão (Obrigatórios pelo Backend)
        isToothAbsent: false,
        fractureLevel: 'NONE',
        crownReduction: false,
        lingualWear: false,
        pulpitis: false,
        pulpChamberExposure: false,
        gingivalRecession: 0,
        periodontalLesions: 'ABSENT',
        gingivitis: 'ABSENT'
      };

      // ROTA CORRIGIDA: '/evaluations' (plural)
      await api.post('/evaluations', payload);
      
      // Sucesso
      alert('Avaliação salva com sucesso!');
      handleClose(); // Usa a função auxiliar
      onSuccess();   // Atualiza a tabela pai
    } catch (error) {
      console.error(error);
      setErrorMsg("Erro ao salvar. Verifique se o backend está rodando e com Seed aplicado.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Avaliação Rápida</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <TextField
            select
            label="Selecione o Animal"
            defaultValue=""
            {...register('animalId', { required: true })}
            fullWidth
            required
          >
            {animals.map((animal) => (
              <MenuItem key={animal.id} value={animal.id}>
                {animal.tagCode} {animal.breed ? `— ${animal.breed}` : ''}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Parecer / Observações"
            multiline
            rows={3}
            placeholder="Descreva o estado geral do animal..."
            {...register('description')}
            fullWidth
          />
          
          <TextField
            label="Nota Geral (1-5)"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            {...register('score', { valueAsNumber: true })}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Salvar Avaliação
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}