import { useEffect, useState } from 'react';
import { 
  Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Typography, Chip 
} from '@mui/material';
// CORREÇÃO 1: Importação explícita de TIPO
import { EvaluationService, type Evaluation } from '../services/api';

export default function History() {
  const [history, setHistory] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await EvaluationService.getAll(); 
        // CORREÇÃO 2: Tratamento seguro de tipo sem "any"
        const rawData = res.data as unknown;
        
        let list: Evaluation[] = [];
        if (Array.isArray(rawData)) {
          list = rawData as Evaluation[];
        } else if (typeof rawData === 'object' && rawData !== null && 'data' in rawData) {
          list = (rawData as { data: Evaluation[] }).data;
        }

        setHistory(list || []);
      } catch (error) {
        console.error("Erro ao buscar histórico", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="fade-in">
      <Typography variant="h4" sx={{ mb: 1, color: '#2c3e50', fontWeight: 'bold' }}>
        Histórico de Avaliações
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
        Registro completo de diagnósticos realizados.
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f9f9f9' }}>
            <TableRow>
              <TableCell><strong>Data</strong></TableCell>
              <TableCell><strong>Animal</strong></TableCell>
              <TableCell><strong>Diagnóstico</strong></TableCell>
              <TableCell><strong>Gravidade</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} align="center">Carregando...</TableCell></TableRow>
            ) : history.length === 0 ? (
              <TableRow><TableCell colSpan={5} align="center">Nenhum registro encontrado.</TableCell></TableRow>
            ) : (
              history.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')} <br/>
                    <span style={{fontSize: '0.75rem', color: '#999'}}>
                      {new Date(item.createdAt).toLocaleTimeString('pt-BR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <strong>{item.animal?.tagCode || 'ID: ' + item.animalId.substring(0,6)}</strong>
                    <br/>
                    <span style={{fontSize: '0.75rem', color: '#666'}}>{item.animal?.breed}</span>
                  </TableCell>
                  <TableCell>
                    <div style={{display: 'flex', gap: 5, flexWrap: 'wrap'}}>
                      {item.isToothAbsent && <Chip label="Ausência" size="small" color="warning" variant="outlined"/>}
                      {item.pulpitis && <Chip label="Pulpite" size="small" color="error" variant="outlined"/>}
                      {(!item.isToothAbsent && !item.pulpitis) && <span style={{color:'#aaa'}}>Sem patologias</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.fractureLevel === 'SEVERE' ? (
                      <Chip label="GRAVE (5)" color="error" size="small" />
                    ) : item.fractureLevel === 'MODERATE' ? (
                      <Chip label="MODERADA (3)" color="warning" size="small" />
                    ) : item.fractureLevel === 'LIGHT' ? (
                      <Chip label="LEVE (1)" color="info" size="small" />
                    ) : (
                      <Chip label="Zero" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label="Concluído" color="success" size="small" />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}