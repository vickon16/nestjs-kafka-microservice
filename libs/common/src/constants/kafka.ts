export const kafkaConstants = {
  serviceName: 'KAFKA_SERVICE',
  brokers: ['localhost:9092'],
  topics: {
    ORDER_CREATED: 'order_created',
    PROCESS_PAYMENT: 'process_payment',
    PAYMENT_SUCCEED: 'payment_succeed',
    GET_ORDERS: 'get_orders',
  },
  clientIds: {
    API_GATEWAY: 'api-gateway-client',
    ORDER_SERVICE: 'order-service-client',
    PAYMENT_SERVICE: 'payment-service-client',
    NOTIFICATION_SERVICE: 'notification-service-client',
  },
  groupIds: {
    API_GATEWAY: 'api-gateway-consumer-group',
    ORDER_SERVICE: 'order-consumer-group',
    PAYMENT_SERVICE: 'payment-consumer-group',
    NOTIFICATION_SERVICE: 'notification-consumer-group',
  },
};
