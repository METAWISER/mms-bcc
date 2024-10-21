import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
// !* Deprecated do to signup mutation in auth.resolver.ts
//import { CreateUserInput } from './dto/inputs/create-user.input';
import { GetUserArgs } from './dto/args/get-user.arg';
import { ValidRolesArgs } from './dto/args/valid-roles.arg';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users', description: 'Get all users' })
  async findAll(@Args() validRoles: ValidRolesArgs): Promise<User[]> {
    console.log(validRoles.roles);
    return await this.userService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user', description: 'Get user by id' })
  async findOne(
    @Args('getUserArgs') getUserArgs: GetUserArgs,
  ): Promise<Partial<User>> {
    return await this.userService.findOne(getUserArgs.id);
  }

  // ! Deprecated do to signup mutation in auth.resolver.ts
  /*   @Mutation(() => User, {
    name: 'createUser',
    description: 'Create a user',
  })
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User | null> {
    return await this.userService.create(createUserInput);
  } */

  @Mutation(() => User, {
    name: 'deleteUser',
    description: 'Delete a user',
    nullable: true,
  })
  async delete(
    @Args('getUserArgs') getUserArgs: GetUserArgs,
  ): Promise<User | null> {
    return await this.userService.delete(getUserArgs.id);
  }
}
