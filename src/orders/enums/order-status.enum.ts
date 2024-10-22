import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
  description: 'Different states an order can be in',
});
