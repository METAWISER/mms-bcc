import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { AssignEmployeeInput } from './dto/inputs/assign-employee.input';
import { GetOrdersArgs } from './dto/args/get-orders.arg';
import { OrderStatus } from './enums/order-status.enum';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<Order>;

  const mockOrderModel = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockProductsService = {
    findByIds: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getModelToken(Order.name), useValue: mockOrderModel },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all orders with no status filter', async () => {
      const orders = [{ _id: 'order1', status: OrderStatus.OPEN }];
      jest.spyOn(orderModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(orders),
      } as any);

      const result = await service.findAll({});
      expect(result).toEqual(orders);
    });

    it('should return orders filtered by status', async () => {
      const orders = [{ _id: 'order1', status: OrderStatus.IN_PROGRESS }];
      jest.spyOn(orderModel, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(orders),
      } as any);

      const getOrdersArgs: GetOrdersArgs = {
        status: OrderStatus.IN_PROGRESS,
      };
      const result = await service.findAll(getOrdersArgs);
      expect(result).toEqual(orders);
    });
  });

  describe('assignEmployee', () => {
    it('should assign an employee to an order', async () => {
      const assignEmployeeInput: AssignEmployeeInput = {
        orderId: 'order1',
      };
      const employee: User = {
        _id: 'employee1',
        name: 'Employee User',
        email: 'employee@example.com',
      } as User;

      const order = {
        _id: 'order1',
        status: OrderStatus.OPEN,
        assignedEmployee: null,
      } as Order;

      jest.spyOn(orderModel, 'findById').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(order),
      } as any);
      jest.spyOn(orderModel, 'findByIdAndUpdate').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue({
          ...order,
          assignedEmployee: employee._id,
          status: OrderStatus.IN_PROGRESS,
        }),
      } as any);

      const result = await service.assignEmployee(
        assignEmployeeInput,
        employee,
      );
      expect(result.assignedEmployee).toBe(employee._id);
      expect(result.status).toBe(OrderStatus.IN_PROGRESS);
    });
  });

  describe('completeOrder', () => {
    it('should throw BadRequestException if the order is already completed', async () => {
      const orderId = 'order1';
      const order = {
        _id: orderId,
        status: OrderStatus.COMPLETED,
      } as Order;

      jest.spyOn(orderModel, 'findOne').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(order),
      } as any);

      await expect(service.completeOrder(orderId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
