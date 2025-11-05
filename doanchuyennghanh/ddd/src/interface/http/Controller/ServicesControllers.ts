import { CreateSevervicesUseCase } from "../../../application/services/CreateUserUseCase";
import { GetServiceUseCase } from "../../../application/services/GetServiceUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class ServiceControllers {
    private createUseCase = new CreateSevervicesUseCase(db);
    private getUseCase = new GetServiceUseCase(db);

    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Service Data:", req.body);
            const data = await this.createUseCase.execute(req.body);
            return res.status(201).json({ 
                success: true,
                message: "Tạo dịch vụ thành công",
                data: data 
            });
        } catch (error: any) {
            console.error("Error creating service:", error);
            return res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }
    };

    GetAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.getUseCase.getAll();
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting all services:", error);
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

            const data = await this.getUseCase.execute(id);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy dịch vụ"
                });
            }

            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (error: any) {
            console.error("Error getting service:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetAvailable = async (req: Request, res: Response): Promise<Response> => {
        try {
            const data = await this.getUseCase.getAvailable();
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting available services:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetByCategory = async (req: Request, res: Response): Promise<Response> => {
        try {
            const categoryId = parseInt(req.params.categoryId);
            if (isNaN(categoryId)) {
                return res.status(400).json({
                    success: false,
                    error: "Category ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.getByCategory(categoryId);
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting services by category:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    Update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    error: "ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.update(id, req.body);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy dịch vụ"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Cập nhật dịch vụ thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error updating service:", error);
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

            const deleted = await this.getUseCase.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy dịch vụ để xóa"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Xóa dịch vụ thành công"
            });
        } catch (error: any) {
            console.error("Error deleting service:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

export default new ServiceControllers(); 
