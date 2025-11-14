import { Knex } from "knex";
import { CreateOrderDTO } from "../dtos/CreateOrderDTO";
import { CreateOrderDishDTO } from "../dtos/Createorder_dishesDTO";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";

interface CreateOrderInput {
  order?: CreateOrderDTO;
  dishes?: Array<{dish_id: number, quantity: number}>;
  wedding_package_id?: number;
  service_id?: number;
  notes?: string;
  event_address?: string;

  customer?: {
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    password?: string;
  };
  user_id?: number;
  event_date: string;
  guest_count: number;
  discount_amount?: number;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export class CreateOrderUseCase {
  constructor(private db: Knex) {}

  async execute(input: CreateOrderInput): Promise<{
    order: Order;
    dishes: OrderDish[];
    user?: any;
  }> {
    const { 
      dishes, 
      wedding_package_id, 
      service_id,
      notes, 
      event_address,
      customer, 
      user_id, 
      event_date, 
      guest_count, 
      discount_amount = 0, 
      status = 'pending' 
    } = input;

    // Validation
    if (!event_date || !guest_count) {
      throw new Error("Ngày sự kiện và số khách là bắt buộc");
    }

    // Kiểm tra ít nhất phải có dishes hoặc wedding package hoặc services
    if ((!dishes || dishes.length === 0) && !wedding_package_id && !service_id) {
      throw new Error("Đơn hàng phải có ít nhất một món ăn, gói cưới hoặc dịch vụ");
    }

    let finalUserId = user_id;
    let createdUser = null;

    // Tạo user mới nếu có thông tin customer
    if (customer && !user_id) {
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await this.db("users").where({ email: customer.email }).first();
      if (existingUser) {
        finalUserId = existingUser.id;
        createdUser = existingUser;
      } else {
        // Tạo user mới
        const [newUserId] = await this.db("users").insert({
          username: customer.username,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          address: customer.address,
          password: customer.password || 'default123', // Password mặc định
          role: 'user',
          created_at: new Date(),
          updated_at: new Date()
        });
        finalUserId = newUserId;
        createdUser = await this.db("users").where({ id: newUserId }).first();
      }
    }

    // Kiểm tra user tồn tại
    if (!finalUserId) {
      throw new Error("Phải có thông tin khách hàng hoặc user ID");
    }

    const userExists = await this.db("users").where({ id: finalUserId }).first();
    if (!userExists) {
      throw new Error("User không tồn tại");
    }

    let totalAmount = 0;
    let orderType: 'dishes_only' | 'with_wedding_package' | 'with_service' | 'mixed' = 'dishes_only';

    // Tính toán giá từ wedding package
    if (wedding_package_id) {
      const weddingPackage = await this.db("wedding_packages").where({ id: wedding_package_id }).first();
      if (!weddingPackage) {
        throw new Error(`Gói cưới ID ${wedding_package_id} không tồn tại`);
      }
      totalAmount += parseFloat(weddingPackage.price);
      orderType = dishes && dishes.length > 0 ? 'mixed' : 'with_wedding_package';
    }

    // Tính toán giá từ service
    if (service_id) {
      const service = await this.db("services").where({ id: service_id }).first();
      if (!service) {
        throw new Error(`Dịch vụ ID ${service_id} không tồn tại`);
      }
      if (!service.is_available) {
        throw new Error(`Dịch vụ "${service.name}" hiện không có sẵn`);
      }
      totalAmount += parseFloat(service.price);
      
      if (wedding_package_id) {
        orderType = 'mixed';
      } else {
        orderType = dishes && dishes.length > 0 ? 'mixed' : 'with_service';
      }
    }

    // Tính toán giá từ dishes
    const dishesToInsert: CreateOrderDishDTO[] = [];
    if (dishes && dishes.length > 0) {
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
      
      if (!wedding_package_id && !service_id) {
        orderType = 'dishes_only';
      }
    }

    // Tính final_amount
    const finalAmount = totalAmount - discount_amount;
    if (finalAmount < 0) {
      throw new Error("Số tiền giảm giá không thể lớn hơn tổng tiền");
    }

    // Tạo order
    const [orderId] = await this.db("orders").insert({
      user_id: finalUserId,
      event_date: event_date,
      guest_count: guest_count,
      total_amount: totalAmount,
      discount_amount: discount_amount,
      final_amount: finalAmount,
      status: status,
      wedding_package_id: wedding_package_id || null,
      service_id: service_id || null,
      notes: notes || null,
      event_address: event_address || null,
      order_type: orderType,
      created_at: new Date(),
      updated_at: new Date()
    });

    // Tạo order_dishes nếu có
    if (dishesToInsert.length > 0) {
      const orderDishesData = dishesToInsert.map(dish => ({
        order_id: orderId,
        dish_id: dish.dish_id,
        quantity: dish.quantity,
        price: dish.price
      }));

      await this.db("order_dishes").insert(orderDishesData);
    }

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
      finalUserId,
      event_date,
      guest_count,
      totalAmount,
      discount_amount,
      finalAmount,
      status,
      new Date(),
      new Date(),
      wedding_package_id || null,
      service_id || null,
      notes || null,
      orderType,
      event_address || null
    );

    return {
      order: createdOrder,
      dishes: orderDishes,
      user: createdUser
    };
  }

  async createOrderWithVoucher(input: CreateOrderInput & {voucher_code?: string}): Promise<{
    order: Order;
    dishes: OrderDish[];
    user?: any;
    voucher?: any;
  }> {
    const { voucher_code, ...orderInput } = input;
    
    let appliedVoucher = null;
    let calculatedDiscountAmount = orderInput.discount_amount || 0;
    
    if (voucher_code) {
      // Kiểm tra voucher
      const voucher = await this.db("vouchers")
        .where({ code: voucher_code, is_active: true })
        .first();

      if (!voucher) {
        throw new Error("Voucher không tồn tại hoặc đã hết hạn");
      }

      // Kiểm tra thời hạn voucher
      const now = new Date();
      const validFrom = new Date(voucher.valid_from);
      const validTo = new Date(voucher.valid_to);
      
      if (now < validFrom || now > validTo) {
        throw new Error("Voucher đã hết hạn hoặc chưa có hiệu lực");
      }

      // Kiểm tra số lần sử dụng
      if (voucher.used_count >= voucher.max_uses) {
        throw new Error("Voucher đã hết lượt sử dụng");
      }

      // Tính toán tổng tiền trước để kiểm tra voucher
      let totalAmount = 0;
      
      // Tính từ wedding package
      if (orderInput.wedding_package_id) {
        const weddingPackage = await this.db("wedding_packages").where({ id: orderInput.wedding_package_id }).first();
        if (weddingPackage) {
          totalAmount += parseFloat(weddingPackage.price);
        }
      }

     

      // Tính từ service
      if (orderInput.service_id) {
        const service = await this.db("services").where({ id: orderInput.service_id }).first();
        if (service) {
          totalAmount += parseFloat(service.price);
        }
      }

      // Tính từ dishes
      if (orderInput.dishes && orderInput.dishes.length > 0) {
        for (const dishItem of orderInput.dishes) {
          const dish = await this.db("dishes").where({ id: dishItem.dish_id }).first();
          if (dish) {
            totalAmount += dish.price * dishItem.quantity;
          }
        }
      }

      // Kiểm tra minimum order amount
      if (totalAmount < voucher.min_order_amount) {
        throw new Error(`Đơn hàng phải có giá trị tối thiểu ${voucher.min_order_amount.toLocaleString('vi-VN')} ₫ để sử dụng voucher này`);
      }

      // Tính discount
      if (voucher.discount_type === "percent") {
        calculatedDiscountAmount = (totalAmount * voucher.discount_value) / 100;
        if (voucher.max_discount && calculatedDiscountAmount > voucher.max_discount) {
          calculatedDiscountAmount = voucher.max_discount;
        }
      } else if (voucher.discount_type === "amount") {
        calculatedDiscountAmount = voucher.discount_value;
      }

      if (calculatedDiscountAmount > totalAmount) {
        calculatedDiscountAmount = totalAmount;
      }

      appliedVoucher = voucher;
    }

    // Cập nhật discount_amount
    orderInput.discount_amount = calculatedDiscountAmount;

    const result = await this.execute(orderInput);

    // Cập nhật used_count của voucher nếu có
    if (appliedVoucher) {
      await this.db("vouchers")
        .where({ id: appliedVoucher.id })
        .increment("used_count", 1);
    }

    return {
      ...result,
      voucher: appliedVoucher
    };
  }
}