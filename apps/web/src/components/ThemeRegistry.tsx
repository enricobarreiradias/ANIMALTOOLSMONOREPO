'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from '../theme';
import Sidebar from './Sidebar'; 

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}> {/* Cor de fundo mais suave */}
           <Sidebar />
           
           {/* ALTERAÇÃO AQUI: Reduzi o p (padding) de 3 para 0 ou 1 e removi overflow desnecessário */}
           <Box component="main" sx={{ flexGrow: 1, p: 0, width: '100%' }}>
              {/* Adicionamos uma Toolbar vazia para compensar se a Sidebar fosse mobile, 
                  mas como é fixa, apenas garantimos que o children ocupe tudo */}
              {children}
           </Box>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}