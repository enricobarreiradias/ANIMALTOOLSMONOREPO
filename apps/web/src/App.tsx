import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Typography } from '@mui/material';

// Paginas "Temporárias" só para testar a navegação
const Dashboard = () => <Typography variant="h4">Dashboard (Conectado à API)</Typography>;
const Pending = () => <Typography variant="h4">Mesa de Avaliação (Lista)</Typography>;
const Search = () => <Typography variant="h4">Busca de Animais</Typography>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas essas rotas ficam DENTRO do Layout (com barra lateral) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pending" element={<Pending />} />
          <Route path="search" element={<Search />} />
          <Route path="history" element={<Typography variant="h4">Histórico</Typography>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;