import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UserNotFoundException } from './errors/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return (await this.userModel.find().lean().exec()) as User[];
  }

  async findOne(idOrEmail: string): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [{ _id: idOrEmail }, { email: idOrEmail }],
    });

    if (!user) {
      throw new UserNotFoundException(idOrEmail);
    }

    return user.toObject();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const newUser = new this.userModel(createUserInput);
      return (await newUser.save()).toObject();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `User already exists ${JSON.stringify(error.keyValue)}`,
        );
      } else {
        throw new InternalServerErrorException(
          `Can't create user - Check the server logs`,
        );
      }
    }
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);

    return user.toObject();
  }
}
