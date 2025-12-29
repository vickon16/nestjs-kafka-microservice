import type { Order, OrderDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  createOrder(order: OrderDto): Order {
    // In a real application, you would save the order to a database
    // Here, we just return the order with a generated ID
    const dummyOrder = {
      id: randomUUID(),
      name: order?.name || 'Sample Order',
      price: Math.floor(Math.random() * 100) + 1,
      createdAt: new Date().toISOString(),
    };

    return dummyOrder;
  }
}
