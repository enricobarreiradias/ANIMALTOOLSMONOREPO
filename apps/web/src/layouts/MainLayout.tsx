import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, List, Typography, 
  ListItem, ListItemButton, ListItemIcon, ListItemText,
  CssBaseline, Avatar, IconButton, Tooltip
} from '@mui/material';
import { 
  Dashboard, Assignment, History, Search, Pets, 
  Logout, Person 
} from '@mui/icons-material';

const drawerWidth = 260;

export function MainLayout() {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Mesa de Avaliação', icon: <Assignment />, path: '/pending' },
    { text: 'Busca Rápida', icon: <Search />, path: '/search' },
    { text: 'Histórico', icon: <History />, path: '/history' },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* APP BAR (Topo) */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: '#fff', 
          color: '#333',
          boxShadow: '0px 1px 10px rgba(0,0,0,0.05)'
        }}
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Pets sx={{ mr: 2, color: '#1565c0' }} />
            <Typography variant="h6" noWrap component="div" fontWeight="700" color="#1565c0">
              VirtualVet
            </Typography>
          </Box>
          
          {/* Área do Usuário (Limpa, sem simulação hardcoded) */}
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title="Perfil (Em breve)">
              <IconButton size="small">
                <Avatar sx={{ bgcolor: '#e0e0e0', width: 32, height: 32 }}>
                  <Person sx={{ color: '#757575', fontSize: 20 }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* SIDEBAR (Lateral) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0,0,0,0.08)',
            bgcolor: '#fff'
          },
        }}
      >
        <Toolbar /> 
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          <List>
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton 
                    component={Link} 
                    to={item.path}
                    selected={active}
                    sx={{
                      mx: 1.5,
                      borderRadius: 2,
                      '&.Mui-selected': {
                        bgcolor: '#e3f2fd',
                        color: '#1565c0',
                        '&:hover': { bgcolor: '#bbdefb' },
                        '& .MuiListItemIcon-root': { color: '#1565c0' }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: active ? '#1565c0' : '#757575' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                            fontSize: '0.9rem', 
                            fontWeight: active ? 600 : 400 
                        }} 
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          
          <Box sx={{ mt: 'auto', borderTop: '1px solid #eee', mx: 2, pt: 2, position: 'absolute', bottom: 20, width: '85%' }}>
            <ListItemButton sx={{ borderRadius: 2, color: '#d32f2f' }}>
                <ListItemIcon sx={{ minWidth: 40, color: '#d32f2f' }}>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary="Sair" primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }} />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
      
      {/* CONTEÚDO */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, overflowX: 'hidden' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}