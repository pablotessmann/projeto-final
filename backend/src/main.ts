import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function iniciar() {
  const app = await NestFactory.create(AppModule);

  // CORS: autoriza o site Vue (localhost:3000) a chamar esta API
  app.enableCors({ origin: 'http://localhost:3000' });

  // Swagger: documentação e testes da API em http://localhost:8080/api/docs
  const configuracao = new DocumentBuilder()
    .setTitle('API do Projeto Final')
    .setDescription('Rotas da API do projeto final do Senac')
    .setVersion('1.0')
    .build();
  const documento = SwaggerModule.createDocument(app, configuracao);
  SwaggerModule.setup('api/docs', app, documento);

  await app.listen(8080);
}

iniciar();
