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

  @MessagePattern(kafkaConstants.topics.PROCESS_PAYMENT)
  handleProcessPayment(@Payload() order: Order) {
    console.log('[Payment-Service]: Payment in process', order);

    // Simulate processing the payment

    // After processing, emit an event to process payment
    this.kafkaClient.emit(kafkaConstants.topics.PAYMENT_SUCCEED, order);
  }
}
