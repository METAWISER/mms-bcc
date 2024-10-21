import { InputType, Int, Field } from '@nestjs/graphql';
import { IsPositive, IsInt, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field(() => String, { description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Int, { description: 'Product price (integer value)' })
  @IsPositive()
  @IsInt()
  price: number;
}
