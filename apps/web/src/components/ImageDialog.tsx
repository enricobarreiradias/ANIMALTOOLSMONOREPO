import React from 'react';
import { Dialog, DialogContent, IconButton, Box, Slide, Button } from '@mui/material';
import { Close, Map as MapIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

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
  // Nova prop opcional para receber coordenadas
  coordinates?: { lat: string | number, lng: string | number } | null;
}

export function ImageDialog({ open, onClose, imageUrl, altText = 'Imagem ampliada', coordinates }: ImageDialogProps) {
  if (!imageUrl) return null;

  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { 
          bgcolor: 'black',
          overflow: 'hidden',
          borderRadius: 2,
          position: 'relative'
        }
      }}
    >
      {/* Botão de Fechar */}
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 999 }}>
        <IconButton onClick={onClose} sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' } }}>
          <Close sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      {/* Botão do Mapa (Se houver coordenadas) */}
      {coordinates && (
        <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
            <Button 
                variant="contained" 
                color="primary" 
                size="small"
                startIcon={<MapIcon />}
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
                sx={{ 
                    bgcolor: 'rgba(25, 118, 210, 0.9)', 
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: 3
                }}
            >
                Ver Localização
            </Button>
        </Box>
      )}

      <DialogContent sx={{ p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
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