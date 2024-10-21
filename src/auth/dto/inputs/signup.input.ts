import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enum';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @MinLength(6)
  @IsString()
  password: string;

  @Field(() => [ValidRoles], {
    nullable: true,
    defaultValue: [ValidRoles.CLIENT],
  })
  @IsArray()
  @IsOptional()
  roles: ValidRoles[];
}
