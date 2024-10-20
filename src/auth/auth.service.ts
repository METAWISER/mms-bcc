import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignupInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UserNotFoundException } from 'src/users/errors/user-not-found.exception';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger('UsersService');
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private getJwtToken(userId: string): string {
    return this.jwtService.sign({ id: userId });
  }

  async signUp(signupInput: SignupInput): Promise<AuthResponse> {
    try {
      const user = await this.usersService.create(signupInput);
      const token = this.getJwtToken(user._id);
      return { user, token };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    try {
      const { email, password } = loginInput;
      const user = await this.usersService.findOne(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      const token = this.getJwtToken(user._id);

      return { user, token };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === 11000) {
      throw new Error('User already exists');
    } else if (
      error instanceof BadRequestException ||
      error instanceof UserNotFoundException
    ) {
      throw error;
    }
    this.logger.error(error);

    throw new Error('Cannot create user');
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    delete user.password;
    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user._id);
    return { user, token };
  }
}
