import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
        clientId: process.env.CONSUMER_CLIENT_ID,
      },
      consumer: {
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
