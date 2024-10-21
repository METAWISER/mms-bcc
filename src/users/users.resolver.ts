import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
// !* Deprecated do to signup mutation in auth.resolver.ts
//import { CreateUserInput } from './dto/inputs/create-user.input';
import { GetUserArgs } from './dto/args/get-user.arg';
import { ValidRolesArgs } from './dto/args/valid-roles.arg';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enum';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users', description: 'Get all users' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<User[]> {
    void user;
    return await this.userService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user', description: 'Get user by id' })
  async findOne(
    @Args('getUserArgs') getUserArgs: GetUserArgs,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<Partial<User>> {
    void user;
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
    @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User | null> {
    void user;
    return await this.userService.delete(getUserArgs.id);
  }
}
