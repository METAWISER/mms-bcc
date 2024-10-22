import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderInput } from './dto/inputs/create-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { ProductsService } from 'src/products/products.service';
import { GetOrdersArgs } from './dto/args/get-orders.arg';
import { OrderStatus } from './enums/order-status.enum';
import { AssignEmployeeInput } from './dto/inputs/assign-employee.input';

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

  async findAll(getOrdersArgs: GetOrdersArgs): Promise<Order[]> {
    const { status } = getOrdersArgs;

    const filter = status ? { status } : {};
    return (await this.orderModel
      .find(filter)
      .populate('user')
      .populate('assignedEmployee')
      .lean()
      .exec()) as Order[];
  }

  async assignEmployee(
    assignEmployeeInput: AssignEmployeeInput,
    employeeId: User,
  ): Promise<Order> {
    const order = await this.getOrderById(assignEmployeeInput.orderId);

    this.checkOrderNotAssigned(order);

    return await this.updateOrderWithEmployee(order._id, employeeId._id);
  }

  private async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('user')
      .populate('assignedEmployee')
      .lean()
      .exec();

    if (!order) {
      throw new BadRequestException(`Order with ID ${orderId} not found`);
    }

    return order as Order;
  }

  private checkOrderNotAssigned(order: Order): void {
    if (order.assignedEmployee) {
      throw new BadRequestException(
        `Order with ID ${order._id} is already assigned to an employee`,
      );
    }
  }

  private async updateOrderWithEmployee(
    orderId: string,
    employeeId: string,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        orderId,
        {
          assignedEmployee: employeeId,
          status: OrderStatus.IN_PROGRESS,
        },
        { new: true },
      )
      .populate('user')
      .populate('assignedEmployee')
      .lean()
      .exec();

    return updatedOrder as Order;
  }

  async completeOrder(orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findOne({ _id: orderId })
      .populate('user')
      .populate('assignedEmployee')
      .exec();

    if (!order) {
      throw new BadRequestException(`Order with ID ${orderId} not found`);
    }

    this.validateOrderStatusForCompletion(order);

    order.status = OrderStatus.COMPLETED;
    await order.save();

    return order.toObject();
  }

  private validateOrderStatusForCompletion(order: Order): void {
    if (order.status === OrderStatus.COMPLETED) {
      throw new BadRequestException(
        `Order with ID ${order._id} is already completed`,
      );
    }

    if (order.status !== OrderStatus.IN_PROGRESS) {
      throw new BadRequestException(
        `Order must be in 'in_progress' status to be completed`,
      );
    }
  }
}
