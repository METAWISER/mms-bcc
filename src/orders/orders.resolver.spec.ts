import { Test, TestingModule } from '@nestjs/testing';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/inputs/create-order.input';
import { GetOrdersArgs } from './dto/args/get-orders.arg';
import { AssignEmployeeInput } from './dto/inputs/assign-employee.input';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { OrderStatus } from './enums/order-status.enum';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;
  let ordersService: OrdersService;

  const mockOrdersService = {
    findAll: jest.fn(),
    create: jest.fn(),
    assignEmployee: jest.fn(),
    completeOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersResolver, OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(mockOrdersService)
      .compile();

    resolver = module.get<OrdersResolver>(OrdersResolver);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const getOrdersArgs: GetOrdersArgs = { status: OrderStatus.OPEN };
      const user: User = {
        _id: 'user1',
        name: 'Test User',
        email: 'test@example.com',
        roles: [ValidRoles.ADMIN],
      } as User;

      const orders: Order[] = [
        { _id: 'order1', total: 100, status: 'open' } as unknown as Order,
      ];
      jest.spyOn(ordersService, 'findAll').mockResolvedValue(orders);

      const result = await resolver.findAll(getOrdersArgs, user);
      expect(result).toEqual(orders);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const createOrderInput: CreateOrderInput = {
        products: ['product1', 'product2'],
      };
      const user: User = {
        _id: 'user2',
        name: 'Client User',
        email: 'client@example.com',
        roles: [ValidRoles.CLIENT],
      } as User;

      const createdOrder: Order = {
        _id: 'order2',
        products: createOrderInput.products,
        total: 200,
        status: 'open',
      } as unknown as Order;
      jest.spyOn(ordersService, 'create').mockResolvedValue(createdOrder);

      const result = await resolver.createOrder(createOrderInput, user);
      expect(result).toEqual(createdOrder);
    });
  });

  describe('assignEmployee', () => {
    it('should assign an employee to an order', async () => {
      const assignEmployeeInput: AssignEmployeeInput = {
        orderId: 'order3',
      };
      const user: User = {
        _id: 'user3',
        name: 'Employee User',
        email: 'employee@example.com',
        roles: [ValidRoles.EMPLOYEE],
      } as User;

      const updatedOrder: Order = {
        _id: assignEmployeeInput.orderId,
        status: 'in_progress',
        assignedEmployee: user._id,
      } as Order;
      jest
        .spyOn(ordersService, 'assignEmployee')
        .mockResolvedValue(updatedOrder);

      const result = await resolver.assignEmployee(assignEmployeeInput, user);
      expect(result).toEqual(updatedOrder);
    });
  });

  describe('completeOrder', () => {
    it('should mark an order as completed', async () => {
      const orderId = 'order4';
      const user: User = {
        _id: 'user4',
        name: 'Admin User',
        email: 'admin@example.com',
        roles: [ValidRoles.ADMIN],
      } as User;

      const completedOrder: Order = {
        _id: orderId,
        status: 'completed',
      } as Order;
      jest
        .spyOn(ordersService, 'completeOrder')
        .mockResolvedValue(completedOrder);

      const result = await resolver.completeOrder(orderId, user);
      expect(result).toEqual(completedOrder);
    });
  });
});
