import { kafkaConstants, type Order } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(kafkaConstants.topics.ORDER_CREATED)
  handleOrderCreated(@Payload() order: Order) {
    console.log('[Notification-Service]: Order created', order);

    // Simulate sending notification
  }

  @MessagePattern(kafkaConstants.topics.PAYMENT_SUCCEED)
  handlePaymentSucceeded(@Payload() order: Order) {
    console.log('[Notification-Service]: Payment succeeded', order);

    // Simulate sending notification
  }
}
