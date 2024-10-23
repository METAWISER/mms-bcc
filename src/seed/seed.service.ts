import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SEED_PRODUCTS, SEED_USERS } from './data/seed-data';

@Injectable()
export class SeedService {
  private isProd: boolean;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {
    this.isProd = configService.get('NODE_ENV') === 'prod';
  }

  async executeSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new UnauthorizedException(
        'You are not allowed to seed the database in production',
      );
    }
    Promise.all([
      this.deleteDatabase(),
      this.createUser(),
      this.createProduct(),
    ]);

    return true;
  }

  async deleteDatabase(): Promise<boolean> {
    await this.userModel.deleteMany({});
    await this.productModel.deleteMany({});
    return true;
  }

  async createUser(): Promise<User> {
    const users = [];

    for (const user of SEED_USERS) {
      users.push(await this.userService.create(user));
    }
    return users[0];
  }

  async createProduct(): Promise<void> {
    const products = [];
    for (const product of SEED_PRODUCTS) {
      products.push(await this.productModel.create(product));
    }
    await Promise.all(products);
  }
}
