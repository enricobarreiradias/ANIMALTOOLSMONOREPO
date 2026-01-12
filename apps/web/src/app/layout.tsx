// apps/web/src/app/layout.tsx
// ATENÇÃO: NÃO ADICIONE "use client" AQUI.
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Box } from '@mui/material';
import ThemeRegistry from '../components/ThemeRegistry'; // O "use client" está DENTRO deste arquivo
import Sidebar from '../components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Animal Tools',
  description: 'Sistema de Avaliação',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeRegistry>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
               <Sidebar />
               <Box component="main" sx={{ flexGrow: 1, p: 4, overflowX: 'hidden' }}>
                  {children}
               </Box>
            </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}