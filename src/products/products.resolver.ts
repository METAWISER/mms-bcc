import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Product)
@UseGuards(JwtAuthGuard)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Create a new product',
  })
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<Product> {
    void user;
    return await this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<Product[]> {
    void user;
    return this.productsService.findAll();
  }
}
