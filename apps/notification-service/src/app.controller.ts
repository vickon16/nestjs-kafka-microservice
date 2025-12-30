import { kafkaConstants, type Order } from '@app/common';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(kafkaConstants.topics.ORDER_CREATED)
  handleOrderCreated(@Payload() order: Order, @Ctx() context: KafkaContext) {
    console.log(
      '[Notification-Service]: Order created',
      order,
      context.getMessage().timestamp,
    );

    // Simulate sending notification
  }

  @EventPattern(kafkaConstants.topics.PAYMENT_SUCCEED)
  handlePaymentSucceeded(
    @Payload() order: Order,
    @Ctx() context: KafkaContext,
  ) {
    console.log(
      '[Notification-Service]: Payment succeeded',
      order,
      context.getMessage().timestamp,
    );

    // Simulate sending notification
  }
}
