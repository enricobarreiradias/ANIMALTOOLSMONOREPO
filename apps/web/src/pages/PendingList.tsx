import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface Animal {
  id: string;
  tagCode: string;
  breed?: string;
}

export default function PendingList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  // CORREÇÃO 1: Iniciar como true evita ter que chamar setState dentro do useEffect
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // CORREÇÃO 2: A função apenas busca e finaliza. Não inicia o loading.
  const fetchAnimals = useCallback(async () => {
    try {
      const res = await api.get('/animal');
      const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
      setAnimals(data);
    } catch (err) {
      console.error("Erro na API:", err);
    } finally {
      // Isso acontece só depois da promessa (assíncrono), então o linter aceita
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  // CORREÇÃO 3: O botão cuida de ativar o loading visualmente
  const handleRefresh = () => {
    setLoading(true);
    fetchAnimals();
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '1.8rem' }}>Mesa de Avaliação</h1>
          <p style={{ color: '#7f8c8d', margin: 0 }}>Selecione um animal do banco de dados.</p>
        </div>
        <button 
          onClick={handleRefresh}
          style={{ padding: '10px 20px', border: '1px solid #ccc', background: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Atualizar Lista (API)
        </button>
      </div>

      {loading && <p>Buscando dados...</p>}
      
      {!loading && animals.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', background: '#fff', borderRadius: 8 }}>
          <h3>Nenhum animal encontrado no Banco de Dados.</h3>
          <p>Utilize o Insomnia para cadastrar um animal na rota <code>POST /animal</code>.</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px' }}>
        
        {animals.map((animal) => (
          <div 
            key={animal.id}
            onClick={() => navigate(`/evaluate/${animal.id}`)}
            style={{ 
              background: '#fff', borderRadius: '12px', padding: '15px', textAlign: 'center', cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: '2px solid transparent', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'transparent'; }}
          >
            <div style={{ width: '80px', height: '80px', background: '#eee', borderRadius: '50%', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
              <span className="material-icons" style={{ fontSize: '40px' }}>pets</span>
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333', display: 'block' }}>
              {animal.tagCode}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px', display: 'block' }}>
              {animal.breed || 'Raça N/A'}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', marginTop: '5px', display: 'block', fontWeight: 'bold' }}>
              ABRIR
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}