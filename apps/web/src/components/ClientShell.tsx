'use client';
import { Box } from '@mui/material';
import ThemeRegistry from './ThemeRegistry';
import Sidebar from './Sidebar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
       <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 4, overflowX: 'hidden' }}>
            {children}
          </Box>
       </Box>
    </ThemeRegistry>
  );
}