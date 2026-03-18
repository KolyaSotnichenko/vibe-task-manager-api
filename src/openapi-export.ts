import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function exportOpenApi(): Promise<void> {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Vibe Task Manager API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const outputDir = join(process.cwd(), 'openapi');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'openapi.json'), JSON.stringify(document, null, 2));

  await app.close();
}

void exportOpenApi();
