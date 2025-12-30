import { kafkaConstants, Order } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { type ClientKafkaProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private orders: Order[] = [];

  constructor(
    @Inject(kafkaConstants.serviceName)
    private readonly kafkaClient: ClientKafkaProxy,
  ) {}

  handleOrderCreated(order: Order) {
    // Simulate processing the order
    this.orders.push(order);

    // After processing, emit an event to process payment
    this.kafkaClient.emit(kafkaConstants.topics.PROCESS_PAYMENT, order);
  }

  getOrders(): Order[] {
    return this.orders;
  }
}
