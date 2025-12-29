export const kafkaConstants = {
  serviceName: 'KAFKA_SERVICE',
  brokers: ['localhost:9092'],
  topics: {
    ORDER_CREATED: 'order_created',
    PROCESS_PAYMENT: 'process_payment',
    PAYMENT_SUCCEED: 'payment_succeed',
  },
  groupIds: {
    ORDER_SERVICE: 'order-consumer-group',
    PAYMENT_SERVICE: 'payment-consumer-group',
    NOTIFICATION_SERVICE: 'notification-consumer-group',
  },
};
