import { Knex } from "knex";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";
import { CreateOrderDTO } from "../../application/dtos/CreateOrderDTO";
import { CreateOrderDishDTO } from "../../application/dtos/Createorder_dishesDTO";

export class OrderRepository {
  constructor(private db: Knex) {}

  async create(orderData: CreateOrderDTO): Promise<Order> {
    const [id] = await this.db("orders").insert({
      user_id: orderData.user_id,
      event_date: orderData.event_date,
      guest_count: orderData.guest_count,
      total_amount: orderData.total_amount,
      discount_amount: orderData.discount_amount,
      final_amount: orderData.final_amount,
      status: orderData.status,
      created_at: new Date(),
      updated_at: new Date()
    });

    return new Order(
      id,
      orderData.user_id,
      orderData.event_date,
      orderData.guest_count,
      orderData.total_amount,
      orderData.discount_amount,
      orderData.final_amount,
      orderData.status,
      new Date(),
      new Date()
    );
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.db("orders").where({ id }).first();
    
    if (!order) {
      return null;
    }

    return new Order(
      order.id,
      order.user_id,
      order.event_date,
      order.guest_count,
      order.total_amount,
      order.discount_amount,
      order.final_amount,
      order.status,
      order.created_at,
      order.updated_at
    );
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await this.db("orders")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");

    return orders.map(order => new Order(
      order.id,
      order.user_id,
      order.event_date,
      order.guest_count,
      order.total_amount,
      order.discount_amount,
      order.final_amount,
      order.status,
      order.created_at,
      order.updated_at
    ));
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.db("orders")
      .orderBy("created_at", "desc");

    return orders.map(order => new Order(
      order.id,
      order.user_id,
      order.event_date,
      order.guest_count,
      order.total_amount,
      order.discount_amount,
      order.final_amount,
      order.status,
      order.created_at,
      order.updated_at
    ));
  }

  async update(id: number, data: Partial<CreateOrderDTO>): Promise<Order | null> {
    await this.db("orders")
      .where({ id })
      .update({
        ...data,
        updated_at: new Date()
      });

    return this.findById(id);
  }

  async updateStatus(id: number, status: string): Promise<Order | null> {
    await this.db("orders")
      .where({ id })
      .update({ 
        status,
        updated_at: new Date()
      });

    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    // Xóa order_dishes trước
    await this.db("order_dishes").where({ order_id: id }).del();
    
    // Xóa order
    const deleted = await this.db("orders").where({ id }).del();
    
    return deleted > 0;
  }

  // Order Dishes methods
  async createOrderDish(orderDishData: CreateOrderDishDTO): Promise<OrderDish> {
    const [id] = await this.db("order_dishes").insert({
      order_id: orderDishData.order_id,
      dish_id: orderDishData.dish_id,
      quantity: orderDishData.quantity,
      price: orderDishData.price
    });

    return new OrderDish(
      id,
      orderDishData.order_id,
      orderDishData.dish_id,
      orderDishData.quantity,
      orderDishData.price
    );
  }

  async findOrderDishesByOrderId(orderId: number): Promise<OrderDish[]> {
    const orderDishes = await this.db("order_dishes")
      .where({ order_id: orderId });

    return orderDishes.map(od => new OrderDish(
      od.id,
      od.order_id,
      od.dish_id,
      od.quantity,
      od.price
    ));
  }

  async updateOrderDishQuantity(id: number, quantity: number): Promise<OrderDish | null> {
    await this.db("order_dishes")
      .where({ id })
      .update({ quantity });

    const orderDish = await this.db("order_dishes").where({ id }).first();
    
    if (!orderDish) {
      return null;
    }

    return new OrderDish(
      orderDish.id,
      orderDish.order_id,
      orderDish.dish_id,
      orderDish.quantity,
      orderDish.price
    );
  }

  async deleteOrderDish(id: number): Promise<boolean> {
    const deleted = await this.db("order_dishes").where({ id }).del();
    return deleted > 0;
  }
}