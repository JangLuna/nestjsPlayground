import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT, () => {
    Logger.log(`Server Listening on port ${process.env.PORT}`)
  });
}
bootstrap();
