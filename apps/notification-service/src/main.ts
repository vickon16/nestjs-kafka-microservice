import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConstants } from '@app/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: kafkaConstants.clientIds.NOTIFICATION_SERVICE,
          brokers: kafkaConstants.brokers,
        },
        consumer: {
          groupId: kafkaConstants.groupIds.NOTIFICATION_SERVICE,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await app.listen();

  Logger.log(`🚀 Notification Service is listening to kafka`);
}
void bootstrap();
