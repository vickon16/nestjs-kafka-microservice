import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { kafkaConstants } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: kafkaConstants.serviceName,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: kafkaConstants.clientIds.API_GATEWAY,
            brokers: kafkaConstants.brokers,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
          consumer: {
            groupId: kafkaConstants.groupIds.API_GATEWAY,
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
