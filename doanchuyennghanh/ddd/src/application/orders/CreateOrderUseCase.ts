import { Knex } from "knex";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { CreateOrderDishDTO } from "../dtos/Createorder_dishesDTO";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";

interface CreateOrderInput {
  order: CreateOrderDTO;
  dishes: Array<{dish_id: number, quantity: number}>;
}

export class CreateOrderUseCase {
  constructor(private db: Knex) {}

  async execute(input: CreateOrderInput): Promise<{
    order: Order;
    dishes: OrderDish[];
  }> {
    const { order, dishes } = input;

    // Validation
    if (!order.user_id) throw new Error("User ID là bắt buộc");
    if (!order.event_date || !order.guest_count) {
      throw new Error("Ngày sự kiện và số khách là bắt buộc");
    }
    if (!dishes || dishes.length === 0) {
      throw new Error("Đơn hàng phải có ít nhất một món ăn");
    }

    // Kiểm tra user tồn tại
    const userExists = await this.db("users").where({ id: order.user_id }).first();
    if (!userExists) {
      throw new Error("User không tồn tại");
    }

    // Tính toán giá từ dishes
    let totalAmount = 0;
    const dishesToInsert: CreateOrderDishDTO[] = [];

    for (const dishItem of dishes) {
      const dish = await this.db("dishes").where({ id: dishItem.dish_id }).first();
      if (!dish) {
        throw new Error(`Món ăn ID ${dishItem.dish_id} không tồn tại`);
      }

      if (!dish.is_available) {
        throw new Error(`Món ăn "${dish.name}" hiện không có sẵn`);
      }

      if (dishItem.quantity <= 0) {
        throw new Error("Số lượng món ăn phải lớn hơn 0");
      }

      const lineTotal = dish.price * dishItem.quantity;
      totalAmount += lineTotal;

      dishesToInsert.push(new CreateOrderDishDTO(
        0, // order_id sẽ được set sau
        dishItem.dish_id,
        dishItem.quantity,
        dish.price
      ));
    }

    // Tính final_amount
    const finalAmount = totalAmount - order.discount_amount;
    if (finalAmount < 0) {
      throw new Error("Số tiền giảm giá không thể lớn hơn tổng tiền");
    }

    // Tạo order
    const [orderId] = await this.db("orders").insert({
      user_id: order.user_id,
      event_date: order.event_date,
      guest_count: order.guest_count,
      total_amount: totalAmount,
      discount_amount: order.discount_amount,
      final_amount: finalAmount,
      status: order.status,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Tạo order_dishes
    const orderDishesData = dishesToInsert.map(dish => ({
      order_id: orderId,
      dish_id: dish.dish_id,
      quantity: dish.quantity,
      price: dish.price
    }));

    await this.db("order_dishes").insert(orderDishesData);

    // Lấy order dishes đã tạo
    const createdOrderDishes = await this.db("order_dishes")
      .where({ order_id: orderId })
      .select("*");

    const orderDishes = createdOrderDishes.map(od => new OrderDish(
      od.id,
      od.order_id,
      od.dish_id,
      od.quantity,
      od.price
    ));

    const createdOrder = new Order(
      orderId,
      order.user_id,
      order.event_date,
      order.guest_count,
      totalAmount,
      order.discount_amount,
      finalAmount,
      order.status,
      new Date(),
      new Date()
    );

    return {
      order: createdOrder,
      dishes: orderDishes
    };
  }

  async createOrderWithVoucher(input: CreateOrderInput & {voucher_code?: string}): Promise<{
    order: Order;
    dishes: OrderDish[];
  }> {
    const { voucher_code, ...orderInput } = input;
    
    if (voucher_code) {
      // Kiểm tra voucher
      const voucher = await this.db("vouchers")
        .where({ code: voucher_code, is_active: true })
        .first();

      if (!voucher) {
        throw new Error("Voucher không tồn tại hoặc đã hết hạn");
      }

      // Tính discount
      let discountAmount = 0;
      const totalAmount = orderInput.order.total_amount;

      if (voucher.discount_type === "percent") {
        discountAmount = (totalAmount * voucher.discount_value) / 100;
        if (voucher.max_discount && discountAmount > voucher.max_discount) {
          discountAmount = voucher.max_discount;
        }
      } else if (voucher.discount_type === "amount") {
        discountAmount = voucher.discount_value;
      }

      if (discountAmount > totalAmount) {
        discountAmount = totalAmount;
      }

      // Cập nhật discount_amount
      orderInput.order.discount_amount = discountAmount;
    }

    return this.execute(orderInput);
  }
}