import { Knex } from "knex";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";

interface CreateOrderInput {
  userId: number; // Chỉ dùng userId có sẵn
  order: CreateOrderDTO;
  dishes: OrderDish[]; // Truyền sẵn order_dishes
}

export class CreateOrderUseCase {
  constructor(private db: Knex) {}

  async execute(input: CreateOrderInput): Promise<{
    order: Order;
    dishes: OrderDish[];
  }> {
    const { userId, order, dishes } = input;

    if (!userId) throw new Error("Cần truyền userId hợp lệ");
    if (!order || !order.eventDate || !order.guestCount || !order.totalAmount || !order.finalAmount) {
      throw new Error("Thông tin đơn hàng chưa đầy đủ");
    }
    if (!dishes || dishes.length === 0) {
      throw new Error("Đơn hàng phải có ít nhất một món ăn");
    }

    // Kiểm tra dishId tồn tại
    for (const d of dishes) {
      const dishExists = await this.db('dishes').where({ id: d.dishId }).first();
      if (!dishExists) {
        throw new Error(`Dish ID ${d.dishId} không tồn tại`);
      }
    }

    // Thêm order
    const [orderId] = await this.db("orders").insert({
      user_id: userId,
      package_id: order.packageId || null,
      voucher_id: order.voucherId || null,
      event_date: order.eventDate,
      guest_count: order.guestCount,
      total_amount: order.totalAmount,
      discount_amount: order.discountAmount || 0,
      final_amount: order.finalAmount,
      status: order.status || "pending"
    });

    const orderRow: Order = {
      id: orderId,
      userId,
      packageId: order.packageId || null,
      voucherId: order.voucherId || null,
      eventDate: order.eventDate,
      guestCount: order.guestCount,
      totalAmount: order.totalAmount,
      discountAmount: order.discountAmount || 0,
      finalAmount: order.finalAmount,
      status: order.status || "pending",
      createdAt: new Date()
    } as Order;

    // Gắn order_dishes vào orderId
    const dishesToInsert = dishes.map(d => ({
      order_id: orderId,
      dish_id: d.dishId,
      quantity: d.quantity,
      price: d.price
    }));

    await this.db("order_dishes").insert(dishesToInsert);

    return {
      order: orderRow,
      dishes
    };
  }
}
