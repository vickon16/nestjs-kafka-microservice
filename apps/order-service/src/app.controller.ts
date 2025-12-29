import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { kafkaConstants, type Order } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(kafkaConstants.serviceName)
    private readonly kafkaClient: ClientKafka,
  ) {}

  @MessagePattern(kafkaConstants.topics.ORDER_CREATED)
  handleOrderCreated(@Payload() order: Order) {
    console.log('[Order-Service]: Received new order', order);

    // Simulate processing the order

    // After processing, emit an event to process payment
    this.kafkaClient.emit(kafkaConstants.topics.PROCESS_PAYMENT, order);
  }
}
