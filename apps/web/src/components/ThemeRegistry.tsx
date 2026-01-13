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
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
           <Sidebar />
           
           <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
              {children}
           </Box>
        </Box>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}