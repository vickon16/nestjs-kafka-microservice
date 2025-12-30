import { kafkaConstants, type Order } from '@app/common';
import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(kafkaConstants.topics.ORDER_CREATED)
  handleOrderCreated(@Payload() order: Order, @Ctx() context: KafkaContext) {
    console.log(
      '[Order-Service]: Received new order',
      order,
      context.getMessage().timestamp,
    );

    this.appService.handleOrderCreated(order);
  }

  @MessagePattern(kafkaConstants.topics.GET_ORDERS)
  handleGetOrders(): Order[] {
    console.log('Here');
    return this.appService.getOrders();
  }
}
