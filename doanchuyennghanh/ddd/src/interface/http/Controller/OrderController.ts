import { CreateOrderUseCase } from "../../../application/orders/CreateOrderUseCase";
import { GetOrderUseCase } from "../../../application/orders/GetOrderUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class OrderController {
  private createUseCase = new CreateOrderUseCase(db);
  private getUseCase = new GetOrderUseCase(db);

  Create = async (req: Request, res: Response): Promise<Response> => {
    try {
      console.log("Order Data:", req.body);
      const { order, dishes } = req.body;

      if (!order || !dishes) {
        return res.status(400).json({
          success: false,
          error: "Thiếu thông tin order hoặc dishes"
        });
      }

      const result = await this.createUseCase.execute({ order, dishes });
      
      return res.status(201).json({
        success: true,
        message: "Tạo đơn hàng thành công",
        data: result
      });
    } catch (error: any) {
      console.error("Error creating order:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  CreateWithVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { order, dishes, voucher_code } = req.body;

      if (!order || !dishes) {
        return res.status(400).json({
          success: false,
          error: "Thiếu thông tin order hoặc dishes"
        });
      }

      const result = await this.createUseCase.createOrderWithVoucher({ 
        order, 
        dishes, 
        voucher_code 
      });
      
      return res.status(201).json({
        success: true,
        message: "Tạo đơn hàng với voucher thành công",
        data: result
      });
    } catch (error: any) {
      console.error("Error creating order with voucher:", error);
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
}

export default new OrderController();