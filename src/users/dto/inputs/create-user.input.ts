import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user name' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @Field(() => String, { description: 'user email' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @Field(() => String, { description: 'user password' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsString()
  password: string;

  @Field(() => [ValidRoles], {
    description: 'user roles',
    nullable: true,
    defaultValue: [ValidRoles.CLIENT],
  })
  @IsArray()
  @IsOptional()
  roles: ValidRoles[];
}
