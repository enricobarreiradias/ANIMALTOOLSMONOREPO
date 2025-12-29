import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PendingList from './pages/PendingList';
import EvaluationWorkstation from './pages/EvaluationWorkstation';
import AnimalManagement from './pages/AnimalManagement';
import History from './pages/History';

// CORREÇÃO: Adicionei 'export default' aqui
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="pending" element={<PendingList />} />
          <Route path="evaluate/:id" element={<EvaluationWorkstation />} />
          
          <Route path="search" element={<AnimalManagement />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 