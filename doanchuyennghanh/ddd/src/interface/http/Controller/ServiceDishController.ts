import { CreateServiceDishUseCase } from "../../../application/service_dishes/CreateServiceDishUseCase";
import { GetServiceDishUseCase } from "../../../application/service_dishes/GetServiceDishUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class ServiceDishController {
    private createUseCase = new CreateServiceDishUseCase(db);
    private getUseCase = new GetServiceDishUseCase(db);

    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Service Dish Data:", req.body);
            const data = await this.createUseCase.execute(req.body);
            
            // Auto update service price after adding dish
            await this.updateServicePriceAfterChange(data.service_id);
            
            return res.status(201).json({
                success: true,
                message: "Thêm món ăn vào dịch vụ thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error creating service dish:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    AddMultipleDishesToService = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { service_id, dishes } = req.body;
            
            if (!service_id || !dishes || !Array.isArray(dishes)) {
                return res.status(400).json({
                    success: false,
                    error: "Service ID và danh sách món ăn là bắt buộc"
                });
            }

            const data = await this.createUseCase.addMultipleDishesToService(service_id, dishes);
            
            // Auto update service price after adding dishes
            await this.updateServicePriceAfterChange(service_id);
            
            return res.status(201).json({
                success: true,
                message: "Thêm nhiều món ăn vào dịch vụ thành công",
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error adding multiple dishes to service:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    CreateServiceWithDishes = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { service, dishes } = req.body;
            
            if (!service || !dishes || !Array.isArray(dishes)) {
                return res.status(400).json({
                    success: false,
                    error: "Thông tin dịch vụ và danh sách món ăn là bắt buộc"
                });
            }

            // Calculate service price from dishes
            let totalDishPrice = 0;
            for (const dish of dishes) {
                const dishData = await db("dishes").where({ id: dish.dish_id }).first();
                if (dishData) {
                    totalDishPrice += dishData.price * dish.quantity;
                }
            }

            // Add 20% service fee
            const calculatedPrice = Math.round(totalDishPrice * 1.2);

            // Create service with calculated price
            const serviceData = {
                ...service,
                price: calculatedPrice
            };

            // Create service first
            const [serviceId] = await db("services").insert(serviceData);
            
            // Add dishes to service
            const serviceDishes = await this.createUseCase.addMultipleDishesToService(serviceId, dishes);
            
            // Get complete service with dishes
            const serviceWithDishes = await this.getUseCase.getServiceWithDishes(serviceId);

            return res.status(201).json({
                success: true,
                message: "Tạo gói dịch vụ kèm món ăn thành công",
                data: {
                    ...serviceWithDishes,
                    calculatedPrice: calculatedPrice,
                    totalDishPrice: totalDishPrice
                }
            });
        } catch (error: any) {
            console.error("Error creating service with dishes:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    // Helper method to update service price after changes
    private updateServicePriceAfterChange = async (serviceId: number): Promise<void> => {
        try {
            // Get all dishes in service
            const serviceDishes = await db("service_dishes as sd")
                .join("dishes as d", "sd.dish_id", "d.id")
                .where("sd.service_id", serviceId)
                .select("d.price", "sd.quantity");

            // Calculate total price
            let totalPrice = 0;
            serviceDishes.forEach(sd => {
                totalPrice += sd.price * sd.quantity;
            });

            // Add 20% service fee
            const finalPrice = Math.round(totalPrice * 1.2);

            // Update service price
            await db("services").where({ id: serviceId }).update({ price: finalPrice });
        } catch (error) {
            console.error("Error updating service price:", error);
        }
    };

    GetByServiceId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const serviceId = parseInt(req.params.serviceId);
            if (isNaN(serviceId)) {
                return res.status(400).json({
                    success: false,
                    error: "Service ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.getByServiceId(serviceId);
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting dishes by service:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetByDishId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const dishId = parseInt(req.params.dishId);
            if (isNaN(dishId)) {
                return res.status(400).json({
                    success: false,
                    error: "Dish ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.getByDishId(dishId);
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting services by dish:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetServiceWithDishes = async (req: Request, res: Response): Promise<Response> => {
        try {
            const serviceId = parseInt(req.params.serviceId);
            if (isNaN(serviceId)) {
                return res.status(400).json({
                    success: false,
                    error: "Service ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.getServiceWithDishes(serviceId);
            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (error: any) {
            console.error("Error getting service with dishes:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetAllServicesWithDishes = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.getUseCase.getAllServicesWithDishes();
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting all services with dishes:", error);
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

            const data = await this.getUseCase.getById(id);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy service dish"
                });
            }

            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (error: any) {
            console.error("Error getting service dish by id:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    UpdateQuantity = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            const { quantity } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID không hợp lệ"
                });
            }

            if (!quantity || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    error: "Số lượng phải lớn hơn 0"
                });
            }

            // Get service_id before updating
            const serviceDish = await db("service_dishes").where({ id }).first();
            if (!serviceDish) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy service dish"
                });
            }

            // Update quantity
            const serviceDishRepository = new (await import("../../../infrastructure/repositories/ServiceDishRepository")).ServiceDishRepository(db);
            const data = await serviceDishRepository.update(id, { quantity });
            
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy service dish để cập nhật"
                });
            }

            // Auto update service price after updating quantity
            await this.updateServicePriceAfterChange(serviceDish.service_id);

            return res.status(200).json({
                success: true,
                message: "Cập nhật số lượng thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error updating quantity:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    Delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID không hợp lệ"
                });
            }

            // Get service_id before deleting
            const serviceDish = await db("service_dishes").where({ id }).first();
            if (!serviceDish) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy service dish để xóa"
                });
            }

            // Delete the service dish
            const serviceDishRepository = new (await import("../../../infrastructure/repositories/ServiceDishRepository")).ServiceDishRepository(db);
            const deleted = await serviceDishRepository.delete(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy service dish để xóa"
                });
            }

            // Auto update service price after deleting dish
            await this.updateServicePriceAfterChange(serviceDish.service_id);

            return res.status(200).json({
                success: true,
                message: "Xóa món ăn khỏi dịch vụ thành công"
            });
        } catch (error: any) {
            console.error("Error deleting service dish:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

export default new ServiceDishController();