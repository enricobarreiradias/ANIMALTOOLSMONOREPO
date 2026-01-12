import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // --- ADICIONE ESTA LINHA AQUI ---
  // Isso faz todas as rotas começarem com /api (ex: /api/evaluations)
  app.setGlobalPrefix('api'); 

  const config = new DocumentBuilder()
    .setTitle('AnimalTools Admin API')
    .setDescription('API para gestão de avaliações de saúde bucal bovina')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
  console.log('API Admin rodando em http://localhost:3333');
  console.log('Swagger disponível em http://localhost:3333/api'); 
}
bootstrap();