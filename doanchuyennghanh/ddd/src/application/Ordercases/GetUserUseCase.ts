import { Knex } from "knex";

export class GetOrdersUseCase {
  constructor(private db: Knex) {}

  async executeAll(): Promise<any[]> {
    const rows = await this.db("orders as o")
      .leftJoin("users as u", "o.user_id", "u.id")
      .leftJoin("order_dishes as od", "od.order_id", "o.id")
      .leftJoin("dishes as d", "od.dish_id", "d.id")
      .leftJoin("categories as c", "d.category_id", "c.id")
      // ✅ Đổi từ o.vouchers -> o.voucher_id
      .leftJoin("vouchers as dis", "o.voucher_id", "dis.id")
      .select(
        "o.id as orderId",
        "o.event_date",
        "o.guest_count",
        "o.total_amount",
        "o.discount_amount",
        "o.final_amount",
        "o.status",
        "u.id as userId",
        "u.username",
        "u.email",
        "u.phoneNumber",
        "u.address",
        "od.id as orderDishId",
        "od.dish_id",
        "od.quantity",
        "od.price",
        "d.name as dishName",
        "d.description as dishDescription",
        "c.name as category",
        "d.image_url as imageUrl",
        "dis.id as voucherId",
        "dis.code as discountCode",
        "dis.description as discountDescription",
        "dis.discount_type as discountType",
        "dis.discount_value as discountValue"
      );

    const ordersMap: Record<number, any> = {};

    rows.forEach(row => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          id: row.orderId,
          eventDate: row.event_date,
          guestCount: row.guest_count,
          totalAmount: row.total_amount,
          discountAmount: row.discount_amount,
          finalAmount: row.final_amount,
          status: row.status,
          user: {
            id: row.userId,
            username: row.username,
            email: row.email,
            phoneNumber: row.phoneNumber,
            address: row.address,
          },
          vouchers: row.voucherId
            ? {
                id: row.voucherId,
                code: row.discountCode,
                description: row.discountDescription,
                type: row.discountType,
                value: row.discountValue,
              }
            : null,
          dishes: [],
        };
      }

      if (row.orderDishId) {
        const exists = ordersMap[row.orderId].dishes.find(
          (d: any) => d.id === row.orderDishId
        );
        if (!exists) {
          ordersMap[row.orderId].dishes.push({
            id: row.orderDishId,
            dishId: row.dish_id,
            name: row.dishName,
            description: row.dishDescription,
            quantity: row.quantity,
            price: row.price,
            category: row.category,
            images: row.imageUrl ? [row.imageUrl] : [],
          });
        }
      }
    });

    return Object.values(ordersMap);
  }
}
