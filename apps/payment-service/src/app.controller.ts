import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientKafka,
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { kafkaConstants, type Order } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(kafkaConstants.serviceName)
    private readonly kafkaClient: ClientKafka,
  ) {}

  @EventPattern(kafkaConstants.topics.PROCESS_PAYMENT)
  handleProcessPayment(@Payload() order: Order, @Ctx() context: KafkaContext) {
    console.log(
      '[Payment-Service]: Payment in process',
      order,
      context.getMessage().timestamp,
    );

    // Simulate processing the payment

    // After processing, emit an event to process payment
    this.kafkaClient.emit(kafkaConstants.topics.PAYMENT_SUCCEED, order);
  }
}
