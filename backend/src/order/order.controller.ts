import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async makeOrder(@Body() orderDto: OrderDto) {
    return await this.orderService.makeOrder(orderDto);
  }
}
