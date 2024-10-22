import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/inputs/create-order.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GetOrdersArgs } from './dto/args/get-orders.arg';
import { AssignEmployeeInput } from './dto/inputs/assign-employee.input';

@Resolver(() => Order)
@UseGuards(JwtAuthGuard)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'orders' })
  findAll(
    @Args() getOrdersArgs: GetOrdersArgs,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ) {
    void user;
    return this.ordersService.findAll(getOrdersArgs);
  }

  @Mutation(() => Order, {
    name: 'createOrder',
    description: 'Create an order, only available for clients',
  })
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser([ValidRoles.CLIENT]) user: User,
  ): Promise<Order> {
    return this.ordersService.create(createOrderInput, user);
  }

  @Mutation(() => Order, {
    name: 'assignEmployee',
    description: 'Assign an employee to an order',
  })
  async assignEmployee(
    @Args('assignEmployeeInput') assignEmployeeInput: AssignEmployeeInput,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<Order> {
    return await this.ordersService.assignEmployee(assignEmployeeInput, user);
  }

  @Mutation(() => Order, {
    name: 'completeOrder',
    description: 'Mark an order as completed',
  })
  async completeOrder(
    @Args('orderId') orderId: string,
    @CurrentUser([ValidRoles.ADMIN, ValidRoles.EMPLOYEE]) user: User,
  ): Promise<Order> {
    void user;
    return await this.ordersService.completeOrder(orderId);
  }
}
