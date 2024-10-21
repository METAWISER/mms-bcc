import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/inputs/create-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly productsService: ProductsService,
  ) {}
  async create(createOrderInput: CreateOrderInput, user: User): Promise<Order> {
    const products = await this.productsService.findByIds(
      createOrderInput.products,
    );

    if (products.length !== createOrderInput.products.length) {
      throw new NotFoundException('Some products were not found');
    }

    const total = products.reduce((acc, product) => acc + product.price, 0);

    const newOrder = new this.orderModel({
      ...createOrderInput,
      user: user._id,
      total,
    });

    return (await newOrder.save()).toObject();
  }
}
