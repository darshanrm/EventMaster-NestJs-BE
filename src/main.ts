import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    //   {
    //   logger: ['error', 'warn', 'debug'],
    // }
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
