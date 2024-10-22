import { ArgsType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../../orders/enums/order-status.enum';

@ArgsType()
export class GetOrdersArgs {
  @Field(() => OrderStatus, {
    nullable: true,
    description: 'Status of the order',
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
