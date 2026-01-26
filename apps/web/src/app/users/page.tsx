"use client";

import { useEffect, useState, useCallback } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Avatar, CircularProgress, Alert,
  Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Tooltip, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent
} from '@mui/material';
import { Security, Badge, Add, Edit, Delete } from '@mui/icons-material';
import { AxiosError } from 'axios'; 
import { AuthService } from '../../services/api';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  registrationDate: string;
}

export default function UsersPage() {
  // --- ESTADOS DA LISTA ---
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- ESTADOS DO MODAL (Criação/Edição) ---
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null); // Se null = Criando, Se número = Editando
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user' // Padrão
  });

  // Carregar usuários
  const fetchUsers = useCallback(() => {
    setLoading(true);
    AuthService.getAllUsers()
      .then((response: { data: User[] }) => {
          setUsers(response.data);
          setError('');
      })
      .catch((err: unknown) => { 
        console.error(err);
        setError('Você não tem permissão para ver esta lista ou ocorreu um erro.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- ABRIR MODAL ---
  const handleOpenCreate = () => {
    setEditingId(null); // Modo Criação
    setFormData({ fullName: '', email: '', password: '', role: 'user' });
    setOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingId(user.id); // Modo Edição
    setFormData({
        fullName: user.fullName,
        email: user.email,
        password: '', // Senha começa vazia na edição (só preenche se quiser mudar)
        role: user.role
    });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setFormData({ fullName: '', email: '', password: '', role: 'user' });
  };

  // --- REMOVER USUÁRIO ---
  const handleDelete = async (id: number, name: string) => {
      if (!confirm(`Tem certeza que deseja remover o usuário "${name}"? Essa ação não pode ser desfeita.`)) {
          return;
      }

      try {
          await AuthService.removeUser(id);
          alert('Usuário removido com sucesso.');
          fetchUsers();
      } catch (err) {
          console.error(err);
          alert('Erro ao remover usuário.');
      }
  };

  // --- SALVAR (CRIAR OU EDITAR) ---
  const handleSave = async () => {
    // Validação
    if (!formData.fullName || !formData.email) {
        alert("Nome e Email são obrigatórios!");
        return;
    }
    // Na criação, senha é obrigatória. Na edição, é opcional.
    if (!editingId && !formData.password) {
        alert("Defina uma senha provisória.");
        return;
    }

    setSaving(true);
    try {
        if (editingId) {
            // MODO EDIÇÃO
            // CORREÇÃO AQUI: Tipagem explícita em vez de 'any'
            const payload: { fullName: string; email: string; role: string; password?: string } = { 
                fullName: formData.fullName, 
                email: formData.email, 
                role: formData.role 
            };
            
            // Só envia a senha se ela foi digitada
            if (formData.password) {
                payload.password = formData.password;
            }
            
            await AuthService.updateUser(editingId, payload);
            alert("Usuário atualizado com sucesso!");
        } else {
            // MODO CRIAÇÃO
            await AuthService.createUser({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
                // Role sempre nasce como 'user' na criação simples, depois pode editar
            });
            alert("Usuário criado com sucesso!");
        }
        
        handleClose();
        fetchUsers(); 
    } catch (err) { 
        const error = err as AxiosError<{ message: string }>;
        const msg = error.response?.data?.message || "Erro ao salvar usuário.";
        alert(msg);
    } finally {
        setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" fontWeight={800} color="primary">
            Gestão de Equipe
            </Typography>
            <Typography variant="body1" color="text.secondary">
            Gerencie acessos, senhas e funções.
            </Typography>
        </Box>
        <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleOpenCreate}
            sx={{ borderRadius: 3, textTransform: 'none', px: 3 }}
        >
            Novo Usuário
        </Button>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        {loading ? (
           <Box p={5} display="flex" justifyContent="center"><CircularProgress /></Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: '#f8fafc' }}>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Função</TableCell>
                <TableCell>Cadastro</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: user.role === 'admin' ? 'primary.main' : 'secondary.main' }}>
                        {user.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
                      </Avatar>
                      <Typography fontWeight="bold">{user.fullName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === 'admin' ? (
                        <Chip icon={<Security />} label="Administrador" color="primary" size="small" />
                    ) : (
                        <Chip icon={<Badge />} label="Veterinário" variant="outlined" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.registrationDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end" spacing={1}>
                          <Tooltip title="Editar Dados e Senha">
                              <IconButton size="small" color="primary" onClick={() => handleOpenEdit(user)}>
                                  <Edit fontSize="small" />
                              </IconButton>
                          </Tooltip>
                          <Tooltip title="Remover Acesso">
                              <IconButton size="small" color="error" onClick={() => handleDelete(user.id, user.fullName)}>
                                  <Delete fontSize="small" />
                              </IconButton>
                          </Tooltip>
                      </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* MODAL HÍBRIDO (Criação e Edição) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>
            {editingId ? "Editar Usuário" : "Cadastrar Novo Membro"}
        </DialogTitle>
        <DialogContent>
            <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Nome Completo"
                    fullWidth
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                {/* SELETOR DE FUNÇÃO (Aparece só na Edição) */}
                {editingId && (
                    <FormControl fullWidth>
                        <InputLabel>Função no Sistema</InputLabel>
                        <Select
                            value={formData.role}
                            label="Função no Sistema"
                            onChange={(e: SelectChangeEvent) => setFormData({...formData, role: e.target.value})}
                        >
                            <MenuItem value="user">Veterinário (Padrão)</MenuItem>
                            <MenuItem value="admin">Administrador (Acesso Total)</MenuItem>
                        </Select>
                    </FormControl>
                )}

                <TextField
                    label={editingId ? "Nova Senha (Opcional)" : "Senha Provisória"}
                    type="password"
                    fullWidth
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    helperText={editingId ? "Deixe em branco para manter a senha atual." : "Obrigatório na criação."}
                />
            </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} color="inherit" disabled={saving}>
                Cancelar
            </Button>
            <Button 
                onClick={handleSave} 
                variant="contained" 
                disabled={saving}
            >
                {saving ? "Salvando..." : (editingId ? "Atualizar" : "Cadastrar")}
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}