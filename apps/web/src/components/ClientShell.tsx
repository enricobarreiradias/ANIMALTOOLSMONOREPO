'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation'; // <--- Importamos isto
import ThemeRegistry from './ThemeRegistry';
import Sidebar from './Sidebar';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Verifica se estamos na página de login
  const isLoginPage = pathname === '/';

  return (
    <ThemeRegistry>
       {/* Mantivemos a tua estrutura exata de Box */}
       <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
          
          {/* Lógica: Se NÃO for login, mostra a Sidebar. Se for login, esconde. */}
          {!isLoginPage && <Sidebar />}

          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              // Se for login, tiramos o padding (p: 0) para ficar tela cheia bonita.
              // Nas outras páginas, mantemos o teu p: 2.
              p: isLoginPage ? 0 : 2, 
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