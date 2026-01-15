'use client';
import { Box } from '@mui/material';
import ThemeRegistry from './ThemeRegistry';
import Sidebar from './Sidebar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
       <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
          
          <Sidebar />

          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 1, 
              width: '100%', 
              overflowX: 'hidden'
            }}
          >
            {children}
          </Box>
       </Box>
    </ThemeRegistry>
  );
}