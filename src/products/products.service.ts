import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const product = await this.productModel.findOne({
      name: createProductInput.name,
    });
    if (product) {
      throw new BadRequestException(
        `Product ${createProductInput.name} already exists`,
      );
    }
    return (await this.productModel.create(createProductInput)).toObject();
  }

  async findAll(): Promise<Product[]> {
    return (await this.productModel.find().lean().exec()) as Product[];
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.productModel.find({ _id: { $in: ids } });
  }
}
