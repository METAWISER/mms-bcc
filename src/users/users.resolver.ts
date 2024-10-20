import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/inputs/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User], { name: 'users', description: 'Get all users' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user', description: 'Get user by id' })
  async findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Partial<User>> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User, {
    name: 'createUser',
    description: 'Create a user',
  })
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User | null> {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => User, {
    name: 'deleteUser',
    description: 'Delete a user',
  })
  async delete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User | null> {
    return await this.userService.delete(id);
  }
}
