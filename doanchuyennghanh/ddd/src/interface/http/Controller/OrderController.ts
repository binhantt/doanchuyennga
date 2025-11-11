import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/orders/CreateOrderUseCase";
import { GetOrderUseCase } from "../../../application/orders/GetOrderUseCase";
import { db } from "../../../infrastructure/db";

class OrderController {
    private createOrderUseCase = new CreateOrderUseCase(db);
    private getOrderUseCase = new GetOrderUseCase(db);

    // API cho users - tạo order từ frontend
    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("📦 Order Data:", req.body);
            const { 
                customer,
                items,
                total_amount,
                discount_amount,
                final_amount,
                voucher_code
            } = req.body;

            // Extract event info from customer
            const { event_date, guest_count, notes } = customer || {};
            
            // Process items to separate by type
            const dishes = items?.filter((item: any) => item.type === 'product' || item.type === 'dish') || [];
            const packages = items?.filter((item: any) => item.type === 'package') || [];
            const services = items?.filter((item: any) => item.type === 'service') || [];
            
            const wedding_package_id = packages.length > 0 ? packages[0].itemId : null;
            const service_id = services.length > 0 ? services[0].itemId : null;

            // Validation cơ bản
            if (!event_date || !guest_count) {
                return res.status(400).json({
                    success: false,
                    error: "Ngày sự kiện và số khách là bắt buộc"
                });
            }

            // Kiểm tra phải có thông tin khách hàng
            if (!customer) {
                return res.status(400).json({
                    success: false,
                    error: "Phải có thông tin khách hàng"
                });
            }

            // Kiểm tra ít nhất phải có items
            if (!items || items.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "Đơn hàng phải có ít nhất một sản phẩm"
                });
            }

            // Validate thông tin customer
            const { name, email, phone, address } = customer;
            if (!name || !email || !phone || !address) {
                return res.status(400).json({
                    success: false,
                    error: "Thông tin khách hàng không đầy đủ (cần: name, email, phone, address)"
                });
            }

            // Transform customer data to match backend format
            const transformedCustomer = {
                username: name,
                email: email,
                phoneNumber: phone,
                address: address
            };

            const result = await this.createOrderUseCase.execute({ 
                dishes: dishes.map((item: any) => ({
                    dish_id: item.itemId,
                    quantity: item.quantity
                })), 
                wedding_package_id, 
                service_id,
                notes,
                customer: transformedCustomer,
                user_id: null,
                event_date,
                guest_count,
                discount_amount: discount_amount || 0,
                status: 'pending'
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

    GetById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID không hợp lệ"
                });
            }

            const result = await this.getOrderUseCase.getById(id);
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
            const orders = await this.getOrderUseCase.getAll();
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

            const orders = await this.getOrderUseCase.getByUserId(userId);
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

            const orders = await this.getOrderUseCase.getByStatus(status);
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

            const updatedOrder = await this.getOrderUseCase.updateStatus(id, status);
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
            const stats = await this.getOrderUseCase.getOrderStatistics();
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

            const orders = await this.getOrderUseCase.getOrdersByDateRange(
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

    CreateWithVoucher = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { voucher_code } = req.body;
            if (!voucher_code) {
                return res.status(400).json({
                    success: false,
                    error: "Mã voucher là bắt buộc"
                });
            }

            const result = await this.createOrderUseCase.createOrderWithVoucher(req.body);
            
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

    PrintOrders = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { status, startDate, endDate, userId } = req.query;
            
            let query = db("orders")
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

            if (status) query = query.where("orders.status", status);
            if (startDate && endDate) query = query.whereBetween("orders.event_date", [startDate, endDate]);
            if (userId) query = query.where("orders.user_id", userId);

            const orders = await query.orderBy("orders.created_at", "desc");

            return res.status(200).json({
                success: true,
                message: "Dữ liệu in đơn hàng",
                data: orders
            });
        } catch (error: any) {
            console.error("❌ Error getting print data:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetServiceByOrderId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const orderId = parseInt(req.params.orderId);
            if (isNaN(orderId)) {
                return res.status(400).json({
                    success: false,
                    error: "Order ID không hợp lệ"
                });
            }

            const order = await db("orders").where({ id: orderId }).first();
            if (!order || !order.service_id) {
                return res.status(404).json({
                    success: false,
                    error: "Đơn hàng này không có dịch vụ"
                });
            }

            const service = await db("services")
                .leftJoin("categories", "services.category_id", "categories.id")
                .where("services.id", order.service_id)
                .select("services.*", "categories.name as category_name")
                .first();

            return res.status(200).json({
                success: true,
                data: { order_id: orderId, service: service }
            });
        } catch (error: any) {
            console.error("❌ Error getting service by order ID:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetServiceById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const serviceId = parseInt(req.params.serviceId);
            if (isNaN(serviceId)) {
                return res.status(400).json({
                    success: false,
                    error: "Service ID không hợp lệ"
                });
            }

            const service = await db("services")
                .leftJoin("categories", "services.category_id", "categories.id")
                .where("services.id", serviceId)
                .select("services.*", "categories.name as category_name")
                .first();

            if (!service) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy dịch vụ"
                });
            }

            return res.status(200).json({
                success: true,
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

    CheckVoucher = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { voucher_code, total_amount } = req.body;

            if (!voucher_code) {
                return res.status(400).json({
                    success: false,
                    error: "Mã voucher là bắt buộc"
                });
            }

            const voucher = await db("vouchers")
                .where({ code: voucher_code, is_active: true })
                .first();

            if (!voucher) {
                return res.status(404).json({
                    success: false,
                    error: "Voucher không tồn tại hoặc đã hết hạn"
                });
            }

            // Kiểm tra thời hạn và logic voucher khác...
            
            return res.status(200).json({
                success: true,
                message: "Voucher hợp lệ",
                data: voucher
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