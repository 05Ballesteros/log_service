import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: ['http://localhost:4000', 'http://ticket-service-nest:4201'],
    methods: 'GET,HEAD,PUT,PATCH,POST',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4800);
}
bootstrap();
