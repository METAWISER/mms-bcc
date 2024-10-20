import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class GetUserArgs {
  @Field(() => ID, { description: 'user ID' })
  @IsString()
  @IsNotEmpty()
  id: string;
}
