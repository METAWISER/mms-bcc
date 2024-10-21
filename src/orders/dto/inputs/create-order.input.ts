import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrderInput {
  @Field(() => [String], {
    description: 'List of product IDs included in the order',
  })
  @IsArray()
  @IsNotEmpty({ message: 'Products are required' })
  products: string[];
}
