import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { UUID } from 'mongodb';

@ObjectType()
@Schema()
export class Order extends Document {
  @Field(() => String, { description: 'Order UUID' })
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Field(() => User, { description: 'User who placed the order' })
  @Prop({ type: UUID, ref: User.name, required: true })
  user: string;

  @Field(() => [String], { description: 'List of product IDs', nullable: true })
  @Prop({ type: [String], required: true, default: [] })
  products?: string[];

  @Field(() => OrderStatus, { description: 'Order status' })
  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.OPEN })
  status: OrderStatus;

  @Field(() => User, {
    description: 'Employee assigned to the order',
    nullable: true,
  })
  @Prop({ type: UUID, ref: User.name })
  assignedEmployee?: string;

  @Field(() => Number, { description: 'Total price of the order' })
  @Prop({ type: Number, required: true })
  total: number;

  @Field(() => Date, { description: 'Creation date' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => Date, { description: 'Last update date' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre<Order>('save', function (next) {
  this.updatedAt = new Date();
  next();
});
