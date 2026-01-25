import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './lib/config/swagger';
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ZodValidationPipe());
  setupSwagger(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Server running`);
}

void bootstrap();
