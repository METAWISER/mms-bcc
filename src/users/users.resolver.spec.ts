import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';
//import { CreateUserInput } from './dto/inputs/create-user.input';
import { GetUserArgs } from './dto/args/get-user.arg';
import { User } from './entities/user.entity';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { UserNotFoundException } from './errors/user-not-found.exception';
import { ValidRolesArgs } from './dto/args/valid-roles.arg';

jest.mock('./users.service');

describe('UsersResolver', () => {
  let resolver: UserResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UsersService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          _id: '1',
          name: 'John',
          email: 'john@test.com',
          password: '123456',
          roles: ['client'],
          createdAt: new Date(),
          updatedAt: new Date(),
        } as unknown as User,
      ];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

      const validRoles: ValidRolesArgs = { roles: [ValidRoles.CLIENT] }; // Example roles
      const currentUser: User = {
        _id: 'admin',
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      const result = await resolver.findAll(validRoles, currentUser);
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user: Partial<User> = {
        _id: '1',
        name: 'John',
        email: 'john@test.com',
      };
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user as User);

      const getUserArgs: GetUserArgs = { id: '1' };
      const currentUser: User = {
        _id: 'admin',
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      const result = await resolver.findOne(getUserArgs, currentUser);
      expect(result).toEqual(user);
    });

    it('should throw UserNotFoundException if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(() => {
        throw new UserNotFoundException('1');
      });

      const getUserArgs: GetUserArgs = { id: '1' };
      const currentUser: User = {
        _id: 'admin',
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      await expect(resolver.findOne(getUserArgs, currentUser)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  /*   describe('create', () => {
    it('should create and return a user', async () => {
      const createUserInput: CreateUserInput = {
        name: 'John',
        email: 'john@test.com',
        password: '123456',
      };
      const user: User = {
        ...createUserInput,
        _id: '1',
        roles: ['client'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      jest.spyOn(usersService, 'create').mockResolvedValue(user);

      const result = await resolver.create(createUserInput);
      expect(result).toEqual(user);
    });
  }); */

  describe('delete', () => {
    it('should delete and return a user', async () => {
      const user: User = {
        _id: '1',
        name: 'John',
        email: 'john@test.com',
        password: '123456',
        roles: ['client'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      jest.spyOn(usersService, 'delete').mockResolvedValue(user);

      const getUserArgs: GetUserArgs = { id: '1' };
      const currentUser: User = {
        _id: 'admin',
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;
      const result = await resolver.delete(getUserArgs, currentUser);
      expect(result).toEqual(user);
    });

    it('should throw UserNotFoundException if user is not found', async () => {
      jest.spyOn(usersService, 'delete').mockImplementation(() => {
        throw new UserNotFoundException('1');
      });

      const getUserArgs: GetUserArgs = { id: '1' };
      const currentUser: User = {
        _id: 'admin',
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
        roles: ['admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;

      await expect(resolver.delete(getUserArgs, currentUser)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });
});
