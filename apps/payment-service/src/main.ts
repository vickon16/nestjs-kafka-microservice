import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConstants } from '@app/common';
import { Logger } from '@nestjs/common';
// import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: kafkaConstants.brokers,
        },
        // producer: {
        //   createPartitioner: Partitioners.DefaultPartitioner,
        // },
        consumer: {
          groupId: kafkaConstants.groupIds.PAYMENT_SERVICE,
        },
      },
    },
  );

  await app.listen();

  Logger.log(`🚀 Payment Service is listening to kafka`);
}
void bootstrap();
