import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function exportOpenApi(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Vibe Swager API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync('openapi.json', JSON.stringify(document, null, 2));
  await app.close();
}

void exportOpenApi();
