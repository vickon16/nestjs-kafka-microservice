import { type OrderDto } from '@app/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('order')
  createOrder(@Body() order: OrderDto) {
    const orderResult = this.appService.createOrder(order);
    return { message: 'Order created successfully', order: orderResult };
  }

  @Get('get-orders')
  getOrders() {
    const orders = this.appService.getOrders();
    return { message: 'Orders retrieved successfully', orders };
  }
}
