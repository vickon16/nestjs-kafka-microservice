import { kafkaConstants, type Order, type OrderDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientKafkaProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject(kafkaConstants.serviceName)
    private readonly kafkaClient: ClientKafkaProxy,
  ) {}

  onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(kafkaConstants.topics.GET_ORDERS);
  }

  createOrder(order: OrderDto): Order {
    // In a real application, you would save the order to a database
    // Here, we just return the order with a generated ID
    const dummyOrder = {
      id: randomUUID(),
      name: order?.name || 'Sample Order',
      price: Math.floor(Math.random() * 100) + 1,
      createdAt: new Date().toISOString(),
    };

    this.kafkaClient.emit(kafkaConstants.topics.ORDER_CREATED, dummyOrder);

    return dummyOrder;
  }

  getOrders(): Observable<Order[]> {
    return this.kafkaClient.send<Order[], void>(
      kafkaConstants.topics.GET_ORDERS,
      undefined,
    );
  }
}
