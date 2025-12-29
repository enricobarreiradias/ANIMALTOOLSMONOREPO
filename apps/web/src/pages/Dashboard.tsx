import { useEffect, useState } from 'react';
import { api } from '../services/api';

// 1. Interfaces para substituir o "any"
interface DashboardStats {
  totalAnimals: number;
  evaluated: number;
  critical: number;
}

interface EvaluationRecord {
  id: string;
  fractureLevel: string;
  pulpitis: boolean;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAnimals: 0,
    evaluated: 0,
    critical: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função definida DENTRO do useEffect para evitar problemas de dependência
    const fetchDashboardData = async () => {
      try {
        // Busca animais
        const animalsRes = await api.get('/animal');
        const animals = Array.isArray(animalsRes.data) ? animalsRes.data : (animalsRes.data.data || []);

        // Busca histórico
        const historyRes = await api.get('/evaluations/history');
        const history = Array.isArray(historyRes.data) ? historyRes.data : (historyRes.data.data || []);
        
        // Tipagem explícita no filter
        const criticalCount = history.filter((h: EvaluationRecord) => 
          h.fractureLevel === 'SEVERE' || h.pulpitis === true
        ).length;

        setStats({
          totalAnimals: animals.length,
          evaluated: history.length,
          critical: criticalCount
        });
      } catch (error) {
        console.error("Erro ao carregar dados do Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Array vazio: executa apenas uma vez ao montar

  if (loading) return <div style={{ padding: 40 }}>Carregando dados reais do servidor...</div>;

  return (
    <div className="fade-in">
      <h1 style={{ marginTop: 0, color: '#2c3e50', fontSize: '1.8rem', marginBottom: '10px' }}>Painel de Gestão</h1>
      <p style={{ color: '#7f8c8d', marginTop: 0, marginBottom: '30px' }}>Dados sincronizados com o Banco de Dados.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
        
        <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Total de Animais (Db)</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: '#333' }}>{stats.totalAnimals}</span>
          <div style={{ marginTop: 'auto', paddingTop: '15px', fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="material-icons" style={{ fontSize: '16px' }}>storage</span> Cadastrados
          </div>
        </div>

        <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Laudos Emitidos</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>{stats.evaluated}</span>
          <div style={{ marginTop: 'auto', paddingTop: '15px', fontSize: '0.85rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '5px' }}>
             <span className="material-icons" style={{ fontSize: '16px' }}>check_circle</span> Salvos
          </div>
        </div>

        <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>Casos Graves</span>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--danger)' }}>{stats.critical}</span>
          <div style={{ marginTop: 'auto', paddingTop: '15px', fontSize: '0.85rem', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span className="material-icons" style={{ fontSize: '16px' }}>warning</span> Fratura Grave / Pulpite
          </div>
        </div>

      </div>
    </div>
  );
}