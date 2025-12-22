import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Dashboard, Assignment, Search, History, Pets } from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';


const drawerWidth = 280;

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Função para saber se o item está ativo
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* BARRA LATERAL FIXA */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#fff',
            borderRight: '1px solid #e0e0e0'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#1565c0' }}>
          <Pets />
          <Typography variant="h6" fontWeight="bold">Virtual Vet</Typography>
        </Box>
        
        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')} selected={isActive('/')}>
              <ListItemIcon><Dashboard color={isActive('/') ? 'primary' : 'inherit'} /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItemButton onClick={() => navigate('/avaliacoes')} selected={isActive('/avaliacoes')}>
            <ListItemIcon><Assignment color={isActive('/avaliacoes') ? 'primary' : 'inherit'} /></ListItemIcon>
            <ListItemText primary="Mesa de Avaliação" />
          </ListItemButton>
          
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/search')} selected={isActive('/search')}>
              <ListItemIcon><Search color={isActive('/search') ? 'primary' : 'inherit'} /></ListItemIcon>
              <ListItemText primary="Busca Rápida" />
            </ListItemButton>
          </ListItem>

           <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/history')} selected={isActive('/history')}>
              <ListItemIcon><History color={isActive('/history') ? 'primary' : 'inherit'} /></ListItemIcon>
              <ListItemText primary="Histórico" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* ÁREA DE CONTEÚDO (Onde as páginas carregam) */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f5f7fa', p: 3, minHeight: '100vh' }}>
        <Outlet /> 
      </Box>
    </Box>
  );
}