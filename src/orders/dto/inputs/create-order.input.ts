import { InputType, Field } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => [String], {
    description: 'List of product IDs included in the order',
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Products are required' })
  products: string[];
}
