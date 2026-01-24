"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Drawer, Toolbar, List, Typography, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Box, Card, Avatar, Tooltip, IconButton
} from '@mui/material';
import { 
  Dashboard, Assignment, History, Logout, ChevronRight, Person 
} from '@mui/icons-material';

const drawerWidth = 280;

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // 1. Remove o token de autenticação
    localStorage.removeItem('token');
    // 2. Redireciona forçadamente para a tela de login (Refresh da página)
    window.location.href = '/';
  };

  const menuItems = [
    // CORREÇÃO: Dashboard agora aponta para '/dashboard', pois '/' é a tela de login
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Mesa de Avaliação', icon: <Assignment />, path: '/pending' },
    { text: 'Relatórios', icon: <Assignment />, path: '/reports' },
    { text: 'Histórico', icon: <History />, path: '/history' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box', 
          border: 'none',
          bgcolor: '#fff', 
          boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
        },
      }}
    >
      <Toolbar sx={{ px: 3, mb: 2 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Image 
            src="/logoFull.png" 
            alt="Logo VirtualVet" 
            width={200} 
            height={150} 
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
      </Toolbar>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                component={Link} 
                href={item.path} 
                selected={active}
                sx={{
                  borderRadius: 2, 
                  py: 1.5,
                  '&.Mui-selected': { 
                    bgcolor: 'rgba(0, 0, 0, 0.04)', 
                    color: 'primary.main',
                    fontWeight: 'bold'
                  },
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: active ? 700 : 500 }} />
                {active && <ChevronRight fontSize="small" sx={{ opacity: 0.5, color: 'primary.main' }} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      
      <Box sx={{ mt: 'auto', p: 3 }}>
         <Card variant="outlined" sx={{ bgcolor: '#f8fafc', border: 'none' }}>
            <Box p={2} display="flex" alignItems="center" gap={2}>
               <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  <Person fontSize="small" />
               </Avatar>
               <Box flex={1}>
                  {/* Podes deixar estático ou pegar do localStorage se quiseres */}
                  <Typography variant="subtitle2" fontWeight="bold">Administrador</Typography>
                  <Typography variant="caption" color="text.secondary">Logado</Typography>
               </Box>
               <Tooltip title="Sair do Sistema">
                  <IconButton size="small" color="default" onClick={handleLogout}>
                      <Logout fontSize="small" />
                  </IconButton>
               </Tooltip>
            </Box>
         </Card>
      </Box>
    </Drawer>
  );
}