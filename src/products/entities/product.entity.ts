import { Field, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Product extends Document {
  @Field(() => String, { description: 'Product UUID' })
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Field(() => String, { description: 'Product name' })
  @Prop({ required: true })
  name: string;

  @Field(() => Number, { description: 'Product price' })
  @Prop({ required: true })
  price: number;

  @Field(() => String, { description: 'Product description' })
  @Prop({ required: true })
  description: string;

  @Field(() => Date, { description: 'Creation date' })
  @Prop({ default: Date.now })
  createdAt: Date;

  @Field(() => Date, { description: 'Last update date' })
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre<Product>('save', function (next) {
  this.updatedAt = new Date();
  next();
});
