import { Knex } from "knex";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";

interface CreateOrderInput {
  userId: number;
  order: CreateOrderDTO;
  dishes: OrderDish[];
}

export class CreateOrderUseCase {
  constructor(private db: Knex) {}

  async execute(input: CreateOrderInput): Promise<{
    order: Order;
    dishes: OrderDish[];
  }> {
    const { userId, order, dishes } = input;

    if (!userId) throw new Error("Cần truyền userId hợp lệ");
    if (!order || !order.eventDate || !order.guestCount) {
      throw new Error("Thông tin đơn hàng chưa đầy đủ");
    }
    if (!dishes || dishes.length === 0) {
      throw new Error("Đơn hàng phải có ít nhất một món ăn");
    }

    // 🔹 Kiểm tra món ăn tồn tại & lấy giá từ DB
    let totalAmount = 0;
    const dishesToInsert = [];

    for (const d of dishes) {
      const dish = await this.db("dishes").where({ id: d.dishId }).first();
      if (!dish) throw new Error(`Dish ID ${d.dishId} không tồn tại`);

      const lineTotal = dish.price * d.quantity;
      totalAmount += lineTotal;

      dishesToInsert.push({
        dish_id: d.dishId,
        quantity: d.quantity,
        price: dish.price
      });
    }

    // 🔹 Xử lý voucher giảm giá
    let discountAmount = 0;
    let finalAmount = totalAmount;

    if (order.voucherId) {
      const voucher = await this.db("vouchers").where({ id: order.voucherId }).first();
      if (!voucher) throw new Error("Voucher không tồn tại");

      if (voucher.discount_type === "percent") {
        discountAmount = (totalAmount * voucher.discount_value) / 100;
      } else if (voucher.discount_type === "amount") {
        discountAmount = voucher.discount_value;
      }

      if (discountAmount > totalAmount) discountAmount = totalAmount;
      finalAmount = totalAmount - discountAmount;
    }

    // 🔹 Lưu order
    const [orderId] = await this.db("orders").insert({
      user_id: userId,
      package_id: order.packageId || null,
      voucher_id: order.voucherId || null,
      event_date: order.eventDate,
      guest_count: order.guestCount,
      total_amount: totalAmount,
      discount_amount: discountAmount,
      final_amount: finalAmount,
      status: order.status || "pending"
    });

    // Gắn orderId cho món ăn
    const orderDishesWithOrderId = dishesToInsert.map(d => ({
      ...d,
      order_id: orderId
    }));

    await this.db("order_dishes").insert(orderDishesWithOrderId);

    const orderRow: Order = {
      id: orderId,
      userId,
      packageId: order.packageId || null,
      voucherId: order.voucherId || null,
      eventDate: order.eventDate,
      guestCount: order.guestCount,
      totalAmount,
      discountAmount,
      finalAmount,
      status: order.status || "pending",
      createdAt: new Date()
    } as Order;

    return {
      order: orderRow,
      dishes: dishesToInsert as unknown as OrderDish[]
    };
  }
}
