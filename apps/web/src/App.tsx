import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// Importe seus componentes de página aqui (crie arquivos vazios se não tiver ainda)
import Dashboard from './pages/Dashboard'; 
import EvaluationTable from './pages/EvaluationTable'; // Exemplo para "Mesa de Avaliação"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Quando entrar na raiz, redireciona pro dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* As rotas reais */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="avaliacoes" element={<EvaluationTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;