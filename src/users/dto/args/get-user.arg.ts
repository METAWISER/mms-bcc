import { Field, ID } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

export class GetUserArgs {
  @Field(() => ID, { description: 'user ID' })
  @IsInt()
  id: number;
}
