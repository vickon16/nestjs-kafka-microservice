import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { kafkaConstants, type OrderDto } from '@app/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(kafkaConstants.serviceName)
    private readonly kafkaClient: ClientKafka,
  ) {}

  @Post('order')
  createOrder(@Body() order: OrderDto) {
    const orderResult = this.appService.createOrder(order);
    this.kafkaClient.emit(kafkaConstants.topics.ORDER_CREATED, orderResult);

    return { message: 'Order created successfully', order: orderResult };
  }
}
