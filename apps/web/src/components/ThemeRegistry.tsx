// apps/web/src/components/ThemeRegistry.tsx
'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { theme } from '../lib/theme'; // Importação correta (named export)
import Sidebar from './Sidebar'; 

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* display: flex garante que a Sidebar e o Main fiquem lado a lado */}
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
           <Sidebar />
           
           {/* AQUI ESTÁ O SEGREDO DO "COLCHÃO": */}
           {/* Mude p: 3 para p: 1 (ou 0 se quiser colar total) */}
           {/* width: '100%' força o conteúdo a ocupar todo o espaço restante */}
           <Box component="main" sx={{ flexGrow: 1, p: 1, width: '100%', overflowX: 'hidden' }}>
              {children}
           </Box>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}