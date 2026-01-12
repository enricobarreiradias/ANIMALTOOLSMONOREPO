'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    // Deixa os títulos mais modernos
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2564eb60', // Um azul mais moderno (Tailwind Blue 600) em vez do azul padrão MUI
    },
    background: {
      default: '#f1f5f9', // Fundo cinza suave (Slate 100)
      paper: '#ffffff',
    },
    text: {
      primary: '#000000', // Cinza escuro (Slate 800) - melhor que preto puro
      secondary: '#64748b',
    },
  },
  shape: {
    borderRadius: 8, // Bordas levemente arredondadas, mas não muito
  },
  // AQUI É O PULO DO GATO: REMOVENDO AS SOMBRAS ESTRANHAS
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Remove o CAPS LOCK dos botões
          boxShadow: 'none', // Remove sombra dos botões
          '&:hover': {
            boxShadow: 'none', // Remove sombra no hover também
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove tinturas estranhas no modo dark/light
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Sombra suave estilo Tailwind
        },
        elevation2: {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove sombra da barra superior se houver
          borderBottom: '1px solid #e2e8f0', // Troca por uma borda sutil
        },
      },
    },
  },
});

export default theme;