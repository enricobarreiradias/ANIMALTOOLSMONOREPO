import React from 'react';
import { Dialog, DialogContent, IconButton, Box, Slide } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

// Efeito de transição suave (Slide de baixo para cima)
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string | null;
  altText?: string;
}

export function ImageDialog({ open, onClose, imageUrl, altText = 'Imagem ampliada' }: ImageDialogProps) {
  if (!imageUrl) return null;

  return (
    <Dialog
      fullScreen={false} // Se quiser tela cheia no celular, pode por true
      maxWidth="lg"      // Máximo largura Grande
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { 
          bgcolor: 'black', // Fundo preto para destacar a foto
          overflow: 'hidden',
          borderRadius: 2
        }
      }}
    >
      {/* Botão de Fechar Flutuante */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 999 }}>
        <IconButton onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } }}>
          <Close sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        {/* A Imagem em si */}
        <img 
          src={imageUrl} 
          alt={altText}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '85vh', 
            objectFit: 'contain',
            display: 'block' 
          }} 
        />
      </DialogContent>
    </Dialog>
  );
}