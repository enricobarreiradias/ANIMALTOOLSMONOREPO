import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { 
  Box, Button, Typography, Paper, Grid, Slider, 
  FormControlLabel, Switch, TextField, Chip,
  Card, CardContent, LinearProgress, Alert,
  Tooltip, Divider, Stack
} from '@mui/material';
import { 
  ArrowBack, PhotoCamera, CheckCircle, 
  InfoOutlined, Warning, Error,
  LocalHospital, Healing, Science
} from '@mui/icons-material';
import { AnimalService, EvaluationService } from '../services/api';
import type { Animal, CreateEvaluationDto } from '../services/api';

const EVALUATOR_ID = "d290f1ee-6c54-4b01-90e6-d701748f0851"; 

interface SliderProps {
  name: keyof CreateEvaluationDto;
  label: string;
  relevance: number;
  control: Control<CreateEvaluationDto>;
  description?: string;
}

const SeveritySlider = ({ name, label, relevance, control, description }: SliderProps) => {
  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 8) return 'error';
    if (relevance >= 6) return 'warning';
    return 'default';
  };

  const getSliderColor = (value: number) => {
    if (value >= 4) return '#d32f2f';
    if (value >= 2) return '#ff9800';
    return '#4caf50';
  };

  return (
    <Box 
      mb={3} 
      p={2} 
      sx={{ 
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s',
        '&:hover': {
          boxShadow: 1,
          borderColor: 'primary.light',
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary">
              {label}
            </Typography>
            {description && (
              <Tooltip title={description}>
                <InfoOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
              </Tooltip>
            )}
          </Box>
          {description && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              {description}
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Chip 
            label={`Relevância: ${relevance}`} 
            size="small" 
            color={getRelevanceColor(relevance)}
            variant="filled"
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          />
        </Box>
      </Box>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <Slider
              value={Number(field.value) || 0}
              onChange={(_, val) => field.onChange(val)}
              step={1}
              marks={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 3, label: '3' },
                { value: 5, label: '5' },
              ]}
              min={0}
              max={5}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => {
                const labels = ['Ausente', 'Leve', 'Moderado', 'Grave', 'Muito Grave', 'Crítico'];
                return `${value} - ${labels[value] || ''}`;
              }}
              sx={{
                color: getSliderColor(Number(field.value) || 0),
                height: 6,
                '& .MuiSlider-mark': {
                  backgroundColor: 'currentColor',
                },
                '& .MuiSlider-markLabel': {
                  fontSize: '0.75rem',
                },
                '& .MuiSlider-valueLabel': {
                  backgroundColor: getSliderColor(Number(field.value) || 0),
                  fontWeight: 600,
                }
              }}
            />
            <Box display="flex" justifyContent="space-between" mt={0.5}>
              <Typography variant="caption" color="success.main" fontWeight={500}>
                Ausente
              </Typography>
              <Typography variant="caption" color="warning.main" fontWeight={500}>
                Moderado
              </Typography>
              <Typography variant="caption" color="error.main" fontWeight={500}>
                Grave
              </Typography>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 2,
      bgcolor: `${color}10`,
      border: `1px solid ${color}30`,
      minWidth: 120,
    }}
  >
    <Typography variant="caption" color="text.secondary" fontWeight={500}>
      {title}
    </Typography>
    <Typography variant="h6" color={`${color}.main`} fontWeight={700}>
      {value}
    </Typography>
  </Box>
);

// Helper function to get severity level with proper typing
const getSeverityInfo = (score: number) => {
  if (score >= 200) return { 
    level: 'Crítico', 
    color: 'error' as const, 
    icon: <Error />,
    progressColor: 'error' as const 
  };
  if (score >= 100) return { 
    level: 'Grave', 
    color: 'warning' as const, 
    icon: <Warning />,
    progressColor: 'warning' as const 
  };
  if (score >= 50) return { 
    level: 'Moderado', 
    color: 'info' as const, 
    icon: <InfoOutlined />,
    progressColor: 'info' as const 
  };
  return { 
    level: 'Normal', 
    color: 'success' as const, 
    icon: <CheckCircle />,
    progressColor: 'success' as const 
  };
};

export default function EvaluationWorkstation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const { control, register, handleSubmit, watch } = useForm<CreateEvaluationDto>({
    defaultValues: {
      toothPresence: true,
      toothFracture: 0,
      crownReduction: 0,
      vitrifiedBorder: 0,
      lingualWear: 0,
      pulpitis: 0,
      pulpChamberExposure: 0,
      dentalCalculus: 0,
      abnormalColor: 0,
      caries: 0,
      gingivalRecession: 0,
      periodontalLesions: 0,
      gingivitisEdema: 0,
      gingivitisColor: 0,
      generalObservations: ''
    }
  });

  const formValues = watch();

  useEffect(() => {
    const calculateScore = () => {
      const scores = [
        formValues.toothFracture * 8,
        formValues.crownReduction * 10,
        formValues.lingualWear * 10,
        formValues.pulpitis * 8,
        formValues.pulpChamberExposure * 7,
        formValues.vitrifiedBorder * 7,
        formValues.dentalCalculus * 5,
        formValues.caries * 5,
        formValues.abnormalColor * 5,
        formValues.gingivalRecession * 10,
        formValues.periodontalLesions * 10,
        formValues.gingivitisEdema * 7,
        formValues.gingivitisColor * 7,
      ];
      const total = scores.reduce((a, b) => a + b, 0);
      setTotalScore(total);
    };
    calculateScore();
  }, [formValues]);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      AnimalService.getOne(id)
        .then(res => setAnimal(res.data))
        .catch(err => console.error("Erro ao carregar animal", err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const onSubmit = async (data: CreateEvaluationDto) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await EvaluationService.create({
        ...data,
        animalId: id,
        evaluatorId: EVALUATOR_ID,
      });
      alert('✅ Avaliação Salva com Sucesso!');
      navigate('/pending');
    } catch (error) {
      console.error(error);
      alert('❌ Erro ao salvar. Verifique se o ID do Avaliador está correto.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !animal) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ width: '50%' }}>
          <LinearProgress />
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Carregando dados do animal...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!animal) return null;

  const severity = getSeverityInfo(totalScore);

  return (
    <Box className="fade-in" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      
      {/* Header melhorado */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 10
        }}
      >
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/pending')}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Voltar
        </Button>
        
        <Box textAlign="center">
          <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
            <Science color="primary" />
            <Box>
              <Typography variant="h5" fontWeight={800} color="primary">
                {animal.tagCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {animal.breed} • Estação de Avaliação Técnica
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          color="success" 
          startIcon={<CheckCircle />} 
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          sx={{ 
            px: 4, 
            fontWeight: 'bold',
            borderRadius: 2,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            }
          }}
        >
          {isLoading ? 'Salvando...' : 'Finalizar Laudo'}
        </Button>
      </Paper>

      <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
        
        {/* Painel Esquerdo - Fotografias */}
        <Grid size={{ xs: 12, md: 5 }} sx={{ height: '100%', bgcolor: 'white', borderRight: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Cabeçalho do painel de fotos */}
            <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                <PhotoCamera sx={{ mr: 1, verticalAlign: 'middle' }} />
                Registro Fotográfico
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Documentação visual para análise detalhada
              </Typography>
            </Box>

            {/* Área de preview das fotos */}
            <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: 'grey.50',
                  borderRadius: 3,
                  border: '2px dashed',
                  borderColor: 'grey.300',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                  }
                }}
              >
                <PhotoCamera sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Vista Frontal
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Posicionamento padrão para análise da face dentária
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  bgcolor: 'grey.50',
                  borderRadius: 3,
                  border: '2px dashed',
                  borderColor: 'grey.300',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                  }
                }}
              >
                <PhotoCamera sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Vista Superior
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Ângulo para avaliação oclusal e coronal
                </Typography>
              </Box>
            </Box>

            {/* Painel de score */}
            <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Score da Avaliação
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(totalScore / 300 * 100, 100)} 
                    color={severity.progressColor}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography variant="h4" fontWeight={800} color={`${severity.color}.main`}>
                  {totalScore}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                {severity.icon}
                <Typography variant="body2" color={`${severity.color}.main`} fontWeight={600}>
                  Nível: {severity.level}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ borderRadius: 2, py: 1.5 }}
                startIcon={<PhotoCamera />}
              >
                Upload de Imagens
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Painel Direito - Formulário */}
        <Grid size={{ xs: 12, md: 7 }} sx={{ height: '100%', overflowY: 'auto', p: 0 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            
            {/* Barra de status */}
            <Box sx={{ p: 2.5, bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <StatCard title="Dentária" value={`${totalScore < 150 ? 'OK' : 'Alerta'}`} color="primary" />
                <StatCard title="Periodontal" value={`${totalScore < 100 ? 'OK' : 'Alerta'}`} color="secondary" />
                <StatCard title="Progresso" value={`${Math.round(Object.values(formValues).filter(v => v !== '' && v !== null).length / 15 * 100)}%`} color="success" />
              </Stack>
            </Box>

            {/* Conteúdo rolável */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
              <Card 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <LocalHospital color="primary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h5" fontWeight={800} color="primary" gutterBottom>
                        1. Avaliação Dentária
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Critérios objetivos baseados na anatomia e desgaste físico
                      </Typography>
                    </Box>
                  </Box>

                  <Alert 
                    severity="info" 
                    sx={{ 
                      mb: 4, 
                      borderRadius: 2,
                      bgcolor: 'info.50',
                      border: '1px solid',
                      borderColor: 'info.200'
                    }}
                    icon={<InfoOutlined />}
                  >
                    Avalie a presença e condição geral do dente antes de proceder
                  </Alert>

                  <Box sx={{ 
                    p: 2.5, 
                    bgcolor: 'primary.50', 
                    borderRadius: 2, 
                    mb: 4, 
                    border: '2px solid',
                    borderColor: 'primary.200'
                  }}>
                    <FormControlLabel
                      control={
                        <Controller
                          name="toothPresence"
                          control={control}
                          render={({ field }) => (
                            <Switch 
                              checked={!!field.value} 
                              onChange={(e) => field.onChange(e.target.checked)} 
                              color="primary" 
                              size="medium"
                            />
                          )}
                        />
                      }
                      label={
                        <Box>
                          <Typography fontWeight={700} variant="subtitle1">
                            Dente Presente?
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Critério essencial para continuidade da avaliação
                          </Typography>
                        </Box>
                      }
                    />
                  </Box>

                  <SeveritySlider 
                    name="toothFracture" 
                    label="Fratura Dentária" 
                    relevance={8} 
                    control={control}
                    description="Presença de fraturas ou rachaduras na estrutura dentária"
                  />
                  
                  <SeveritySlider 
                    name="crownReduction" 
                    label="Redução de Coroa" 
                    relevance={10} 
                    control={control}
                    description="Diminuição significativa do tamanho da coroa dentária"
                  />
                  
                  <SeveritySlider 
                    name="lingualWear" 
                    label="Desgaste Lingual" 
                    relevance={10} 
                    control={control}
                    description="Desgaste na superfície lingual do dente"
                  />
                  
                  <SeveritySlider 
                    name="pulpitis" 
                    label="Pulpite" 
                    relevance={8} 
                    control={control}
                    description="Inflamação da polpa dentária"
                  />
                  
                  <SeveritySlider 
                    name="pulpChamberExposure" 
                    label="Exposição Câmara Pulpar" 
                    relevance={7} 
                    control={control}
                    description="Exposição da câmara pulpar devido ao desgaste"
                  />
                  
                  <SeveritySlider 
                    name="vitrifiedBorder" 
                    label="Bordo Vitrificado" 
                    relevance={7} 
                    control={control}
                    description="Aparência vitrificada nas bordas do dente"
                  />
                  
                  <SeveritySlider 
                    name="dentalCalculus" 
                    label="Cálculo Dentário" 
                    relevance={5} 
                    control={control}
                    description="Acúmulo de tártaro na superfície dentária"
                  />
                  
                  <SeveritySlider 
                    name="caries" 
                    label="Cárie" 
                    relevance={5} 
                    control={control}
                    description="Presença de cáries dentárias"
                  />
                  
                  <SeveritySlider 
                    name="abnormalColor" 
                    label="Coloração Anormal" 
                    relevance={5} 
                    control={control}
                    description="Alterações na coloração natural do dente"
                  />
                </CardContent>
              </Card>

              <Card 
                sx={{ 
                  mb: 3, 
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Healing color="secondary" sx={{ fontSize: 32 }} />
                    <Box>
                      <Typography variant="h5" fontWeight={800} color="secondary" gutterBottom>
                        2. Saúde Periodontal
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avaliação de tecidos moles, gengiva e estruturas de suporte
                      </Typography>
                    </Box>
                  </Box>

                  <Alert 
                    severity="warning" 
                    sx={{ 
                      mb: 4, 
                      borderRadius: 2,
                      bgcolor: 'warning.50',
                      border: '1px solid',
                      borderColor: 'warning.200'
                    }}
                    icon={<Warning />}
                  >
                    Atenção às condições periodontais para prevenção de perdas dentárias
                  </Alert>

                  <SeveritySlider 
                    name="gingivalRecession" 
                    label="Recessão Gengival" 
                    relevance={10} 
                    control={control}
                    description="Retração da gengiva expondo a raiz do dente"
                  />
                  
                  <SeveritySlider 
                    name="periodontalLesions" 
                    label="Lesões Periodontais" 
                    relevance={10} 
                    control={control}
                    description="Lesões nos tecidos periodontais de suporte"
                  />
                  
                  <SeveritySlider 
                    name="gingivitisEdema" 
                    label="Gengivite (Edema)" 
                    relevance={7} 
                    control={control}
                    description="Inchaço e edema no tecido gengival"
                  />
                  
                  <SeveritySlider 
                    name="gingivitisColor" 
                    label="Gengivite (Coloração)" 
                    relevance={7} 
                    control={control}
                    description="Alterações na coloração da gengiva"
                  />

                  <Divider sx={{ my: 4 }} />

                  <Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom mb={2}>
                      Observações Gerais
                    </Typography>
                    <TextField
                      label="Descreva detalhes relevantes, observações específicas ou recomendações"
                      placeholder="Ex: Presença de placa bacteriana acentuada na região posterior..."
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      {...register('generalObservations')}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          bgcolor: 'background.paper',
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      Use este espaço para notas importantes que não foram capturadas nos campos acima.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Avaliação completa • {new Date().toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}