import { CreateOrderUseCase } from "../../../application/orders/CreateOrderUseCase";
import { GetOrderUseCase } from "../../../application/orders/GetOrderUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class OrderController {
  private createUseCase = new CreateOrderUseCase(db);
  private getUseCase = new GetOrderUseCase(db);
  private db = db;

  Create = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("📦 Order Data:", req.body);
      const { 
        dishes, 
        wedding_package_id, 
        service_id,
        notes, 
        customer, 
        user_id, 
        event_date, 
        guest_count, 
        discount_amount, 
        status 
      } = req.body;

      // Validation cơ bản
      if (!event_date || !guest_count) {
        return res.status(400).json({
          success: false,
          error: "Ngày sự kiện và số khách là bắt buộc"
        });
      }

      // Kiểm tra phải có thông tin khách hàng hoặc user_id
      if (!customer && !user_id) {
        return res.status(400).json({
          success: false,
          error: "Phải có thông tin khách hàng hoặc user ID"
        });
      }

      // Kiểm tra ít nhất phải có dishes hoặc packages
      if ((!dishes || dishes.length === 0) && !wedding_package_id) {
        return res.status(400).json({
          success: false,
          error: "Đơn hàng phải có ít nhất một món ăn hoặc một gói"
        });
      }

      // Validate thông tin customer nếu có
      if (customer) {
        const { username, email, phoneNumber, address } = customer;
        if (!username || !email || !phoneNumber || !address) {
          return res.status(400).json({
            success: false,
            error: "Thông tin khách hàng không đầy đủ (cần: username, email, phoneNumber, address)"
          });
        }
      }

      const result = await this.createUseCase.execute({ 
        dishes, 
        wedding_package_id, 
        service_id,
        notes,
        customer,
        user_id,
        event_date,
        guest_count,
        discount_amount,
        status
      });
      
      return res.status(201).json({
        success: true,
        message: "Tạo đơn hàng thành công",
        data: result
      });
    } catch (error: any) {
      console.error("❌ Error creating order:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  CreateWithVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("📦 Order with Voucher Data:", req.body);
      const { 
        dishes, 
        wedding_package_id, 
        service_id,
        notes, 
        customer, 
        user_id, 
        event_date, 
        guest_count, 
        discount_amount, 
        status,
        voucher_code 
      } = req.body;

      // Validation cơ bản
      if (!event_date || !guest_count) {
        return res.status(400).json({
          success: false,
          error: "Ngày sự kiện và số khách là bắt buộc"
        });
      }

      // Kiểm tra phải có thông tin khách hàng hoặc user_id
      if (!customer && !user_id) {
        return res.status(400).json({
          success: false,
          error: "Phải có thông tin khách hàng hoặc user ID"
        });
      }

      // Kiểm tra ít nhất phải có dishes hoặc packages
      if ((!dishes || dishes.length === 0) && !wedding_package_id) {
        return res.status(400).json({
          success: false,
          error: "Đơn hàng phải có ít nhất một món ăn hoặc một gói"
        });
      }

      // Validate thông tin customer nếu có
      if (customer) {
        const { username, email, phoneNumber, address } = customer;
        if (!username || !email || !phoneNumber || !address) {
          return res.status(400).json({
            success: false,
            error: "Thông tin khách hàng không đầy đủ (cần: username, email, phoneNumber, address)"
          });
        }
      }

      if (!voucher_code) {
        return res.status(400).json({
          success: false,
          error: "Mã voucher là bắt buộc"
        });
      }

      const result = await this.createUseCase.createOrderWithVoucher({ 
        dishes, 
        wedding_package_id,  
        service_id,
        notes,
        customer,
        user_id,
        event_date,
        guest_count,
        discount_amount,
        status,
        voucher_code 
      });
      
      return res.status(201).json({
        success: true,
        message: "Tạo đơn hàng với voucher thành công",
        data: result
      });
    } catch (error: any) {
      console.error("❌ Error creating order with voucher:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "ID không hợp lệ"
        });
      }

      const result = await this.getUseCase.getById(id);
      if (!result) {
        return res.status(404).json({
          success: false,
          error: "Không tìm thấy đơn hàng"
        });
      }

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error: any) {
      console.error("Error getting order:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const orders = await this.getUseCase.getAll();
      return res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error: any) {
      console.error("Error getting all orders:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          error: "User ID không hợp lệ"
        });
      }

      const orders = await this.getUseCase.getByUserId(userId);
      return res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error: any) {
      console.error("Error getting orders by user:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetByStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { status } = req.params;
      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Trạng thái không hợp lệ"
        });
      }

      const orders = await this.getUseCase.getByStatus(status);
      return res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error: any) {
      console.error("Error getting orders by status:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  UpdateStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          error: "ID không hợp lệ"
        });
      }

      const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: "Trạng thái không hợp lệ"
        });
      }

      const updatedOrder = await this.getUseCase.updateStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          error: "Không tìm thấy đơn hàng"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: updatedOrder
      });
    } catch (error: any) {
      console.error("Error updating order status:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetStatistics = async (req: Request, res: Response): Promise<Response> => {
    try {
      const stats = await this.getUseCase.getOrderStatistics();
      return res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error: any) {
      console.error("Error getting order statistics:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  GetByDateRange = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "Thiếu startDate hoặc endDate"
        });
      }

      const orders = await this.getUseCase.getOrdersByDateRange(
        startDate as string, 
        endDate as string
      );

      return res.status(200).json({
        success: true,
        data: orders,
        count: orders.length
      });
    } catch (error: any) {
      console.error("Error getting orders by date range:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // API in dữ liệu orders
  PrintOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { status, startDate, endDate, userId } = req.query;
      
      let query = this.db("orders")
        .join("users", "orders.user_id", "users.id")
        .leftJoin("wedding_packages", "orders.wedding_package_id", "wedding_packages.id")
        .leftJoin("services", "orders.service_id", "services.id")
        .select(
          "orders.*",
          "users.username",
          "users.email",
          "users.phoneNumber",
          "users.address",
          "wedding_packages.name as wedding_package_name",
          "services.name as service_name"
        );

      // Lọc theo status nếu có
      if (status) {
        query = query.where("orders.status", status);
      }

      // Lọc theo khoảng thời gian nếu có
      if (startDate && endDate) {
        query = query.whereBetween("orders.event_date", [startDate, endDate]);
      }

      // Lọc theo user nếu có
      if (userId) {
        query = query.where("orders.user_id", userId);
      }

      const orders = await query.orderBy("orders.created_at", "desc");

      // Lấy thông tin dishes cho mỗi order
      const ordersWithDishes = await Promise.all(
        orders.map(async (order) => {
          const dishes = await this.db("order_dishes")
            .join("dishes", "order_dishes.dish_id", "dishes.id")
            .where("order_dishes.order_id", order.id)
            .select(
              "order_dishes.quantity",
              "order_dishes.price",
              "dishes.name as dish_name",
              "dishes.description as dish_description"
            );

          return {
            ...order,
            dishes: dishes
          };
        })
      );

      // Tính toán thống kê
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.final_amount), 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const statistics = {
        total_orders: totalOrders,
        total_revenue: totalRevenue,
        average_order_value: averageOrderValue,
        pending_orders: orders.filter(o => o.status === 'pending').length,
        confirmed_orders: orders.filter(o => o.status === 'confirmed').length,
        completed_orders: orders.filter(o => o.status === 'completed').length,
        cancelled_orders: orders.filter(o => o.status === 'cancelled').length
      };

      return res.status(200).json({
        success: true,
        message: "Dữ liệu in đơn hàng",
        data: {
          orders: ordersWithDishes,
          statistics: statistics,
          filters: {
            status: status || 'all',
            startDate: startDate || null,
            endDate: endDate || null,
            userId: userId || null
          },
          generated_at: new Date().toISOString()
        }
      });
    } catch (error: any) {
      console.error("❌ Error getting print data:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // API lấy service từ order
  GetServiceByOrderId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const orderId = parseInt(req.params.orderId);
      if (isNaN(orderId)) {
        return res.status(400).json({
          success: false,
          error: "Order ID không hợp lệ"
        });
      }

      // Lấy thông tin order
      const order = await this.db("orders").where({ id: orderId }).first();
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Không tìm thấy đơn hàng"
        });
      }

      if (!order.service_id) {
        return res.status(404).json({
          success: false,
          error: "Đơn hàng này không có dịch vụ"
        });
      }

      // Lấy thông tin service
      const service = await this.db("services")
        .leftJoin("categories", "services.category_id", "categories.id")
        .where("services.id", order.service_id)
        .select(
          "services.*",
          "categories.name as category_name"
        )
        .first();

      if (!service) {
        return res.status(404).json({
          success: false,
          error: "Không tìm thấy dịch vụ"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lấy thông tin dịch vụ thành công",
        data: {
          order_id: orderId,
          service: service
        }
      });
    } catch (error: any) {
      console.error("❌ Error getting service by order ID:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // API lấy service theo service_id
  GetServiceById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const serviceId = parseInt(req.params.serviceId);
      if (isNaN(serviceId)) {
        return res.status(400).json({
          success: false,
          error: "Service ID không hợp lệ"
        });
      }

      // Lấy thông tin service với category
      const service = await this.db("services")
        .leftJoin("categories", "services.category_id", "categories.id")
        .where("services.id", serviceId)
        .select(
          "services.*",
          "categories.name as category_name"
        )
        .first();

      if (!service) {
        return res.status(404).json({
          success: false,
          error: "Không tìm thấy dịch vụ"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Lấy thông tin dịch vụ thành công",
        data: service
      });
    } catch (error: any) {
      console.error("❌ Error getting service by ID:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  // API kiểm tra voucher
  CheckVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { voucher_code, total_amount } = req.body;

      if (!voucher_code) {
        return res.status(400).json({
          success: false,
          error: "Mã voucher là bắt buộc"
        });
      }

      // Kiểm tra voucher
      const voucher = await this.db("vouchers")
        .where({ code: voucher_code, is_active: true })
        .first();

      if (!voucher) {
        return res.status(404).json({
          success: false,
          error: "Voucher không tồn tại hoặc đã hết hạn"
        });
      }

      // Kiểm tra thời hạn voucher
      const now = new Date();
      const validFrom = new Date(voucher.valid_from);
      const validTo = new Date(voucher.valid_to);
      
      if (now < validFrom || now > validTo) {
        return res.status(400).json({
          success: false,
          error: "Voucher đã hết hạn hoặc chưa có hiệu lực"
        });
      }

      // Kiểm tra số lần sử dụng
      if (voucher.used_count >= voucher.max_uses) {
        return res.status(400).json({
          success: false,
          error: "Voucher đã hết lượt sử dụng"
        });
      }

      // Kiểm tra minimum order amount nếu có total_amount
      if (total_amount && total_amount < voucher.min_order_amount) {
        return res.status(400).json({
          success: false,
          error: `Đơn hàng phải có giá trị tối thiểu ${voucher.min_order_amount.toLocaleString('vi-VN')} ₫ để sử dụng voucher này`
        });
      }

      // Tính discount nếu có total_amount
      let discount_amount = 0;
      if (total_amount) {
        if (voucher.discount_type === "percent") {
          discount_amount = (total_amount * voucher.discount_value) / 100;
          if (voucher.max_discount && discount_amount > voucher.max_discount) {
            discount_amount = voucher.max_discount;
          }
        } else if (voucher.discount_type === "amount") {
          discount_amount = voucher.discount_value;
        }

        if (discount_amount > total_amount) {
          discount_amount = total_amount;
        }
      }

      return res.status(200).json({
        success: true,
        message: "Voucher hợp lệ",
        data: {
          voucher: {
            code: voucher.code,
            description: voucher.description,
            discount_type: voucher.discount_type,
            discount_value: voucher.discount_value,
            min_order_amount: voucher.min_order_amount,
            remaining_uses: voucher.max_uses - voucher.used_count
          },
          discount_amount: discount_amount,
          final_amount: total_amount ? total_amount - discount_amount : null
        }
      });
    } catch (error: any) {
      console.error("❌ Error checking voucher:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };
}

export default new OrderController();