import { Knex } from "knex";
import { Order } from "../../domain/entities/Order";
import { OrderDish } from "../../domain/entities/OrderDish";

export class GetOrderUseCase {
  constructor(private db: Knex) {}

  async getById(id: number): Promise<{order: Order, dishes: any[], wedding_package?: any, service?: any} | null> {
    const order = await this.db("orders").where({ id }).first();
    
    if (!order) {
      return null;
    }

    // Lấy dishes
    const dishes = await this.db("order_dishes")
      .join("dishes", "order_dishes.dish_id", "dishes.id")
      .where("order_dishes.order_id", id)
      .select(
        "order_dishes.*",
        "dishes.name as dish_name",
        "dishes.description as dish_description",
        "dishes.image_url as dish_image_url"
      );

    // Lấy wedding package nếu có
    let wedding_package = null;
    if (order.wedding_package_id) {
      wedding_package = await this.db("wedding_packages")
        .where({ id: order.wedding_package_id })
        .first();
    }

    // Lấy service nếu có
    let service = null;
    if (order.service_id) {
      service = await this.db("services")
        .leftJoin("categories", "services.category_id", "categories.id")
        .where("services.id", order.service_id)
        .select(
          "services.*",
          "categories.name as category_name"
        )
        .first();
    }

    const orderEntity = new Order(
      order.id,
      order.user_id,
      order.event_date,
      order.guest_count,
      order.total_amount,
      order.discount_amount,
      order.final_amount,
      order.status,
      order.created_at,
      order.updated_at,
      order.wedding_package_id,
      order.service_id,
      order.notes,
      order.order_type,
      order.event_address
    );

    return {
      order: orderEntity,
      dishes: dishes,
      wedding_package: wedding_package,
      service: service
    };
  }

  async getByUserId(userId: number): Promise<any[]> {
    const orders = await this.db("orders")
      .join("users", "orders.user_id", "users.id")
      .where("orders.user_id", userId)
      .select(
        "orders.*",
        "users.username",
        "users.email",
        "users.phoneNumber",
        "users.address as customer_address"
      )
      .orderBy("orders.created_at", "desc");

    return orders;
  }

  async getAll(): Promise<any[]> {
    const orders = await this.db("orders")
      .join("users", "orders.user_id", "users.id")
      .leftJoin("wedding_packages", "orders.wedding_package_id", "wedding_packages.id")
      .leftJoin("services", "orders.service_id", "services.id")
      .select(
        "orders.*",
        "users.username",
        "users.email",
        "users.phoneNumber",
        "users.address as customer_address",
        "wedding_packages.name as wedding_package_name",
        "services.name as service_name"
      )
      .orderBy("orders.created_at", "desc");

    return orders;
  }

  async getByStatus(status: string): Promise<any[]> {
    const orders = await this.db("orders")
      .join("users", "orders.user_id", "users.id")
      .where("orders.status", status)
      .select(
        "orders.*",
        "users.username",
        "users.email",
        "users.phoneNumber",
        "users.address as customer_address"
      )
      .orderBy("orders.created_at", "desc");

    return orders;
  }

  async updateStatus(id: number, status: 'pending' | 'confirmed' | 'cancelled' | 'completed'): Promise<Order | null> {
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      throw new Error("Trạng thái không hợp lệ");
    }

    await this.db("orders")
      .where({ id })
      .update({ 
        status: status,
        updated_at: new Date()
      });

    const updatedOrder = await this.db("orders").where({ id }).first();
    
    if (!updatedOrder) {
      return null;
    }

    return new Order(
      updatedOrder.id,
      updatedOrder.user_id,
      updatedOrder.event_date,
      updatedOrder.guest_count,
      updatedOrder.total_amount,
      updatedOrder.discount_amount,
      updatedOrder.final_amount,
      updatedOrder.status,
      updatedOrder.created_at,
      updatedOrder.updated_at
    );
  }

  async getOrderStatistics(): Promise<any> {
    const stats = await this.db("orders")
      .select(
        this.db.raw("COUNT(*) as total_orders"),
        this.db.raw("SUM(final_amount) as total_revenue"),
        this.db.raw("AVG(final_amount) as average_order_value"),
        this.db.raw("COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders"),
        this.db.raw("COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_orders"),
        this.db.raw("COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders"),
        this.db.raw("COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders")
      )
      .first();

    return stats;
  }

  async getOrdersByDateRange(startDate: string, endDate: string): Promise<any[]> {
    const orders = await this.db("orders")
      .join("users", "orders.user_id", "users.id")
      .whereBetween("orders.event_date", [startDate, endDate])
      .select(
        "orders.*",
        "users.username",
        "users.email",
        "users.phoneNumber",
        "users.address as customer_address"
      )
      .orderBy("orders.event_date", "asc");

    return orders;
  }
}