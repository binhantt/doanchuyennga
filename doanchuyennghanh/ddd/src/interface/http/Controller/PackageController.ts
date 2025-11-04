import { CreatePackageUseCase } from "../../../application/packages/CreatePackageUseCase";
import { GetPackageUseCase } from "../../../application/packages/GetPackageUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class PackageController {
    private createUseCase = new CreatePackageUseCase(db);
    private getUseCase = new GetPackageUseCase(db);

    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Package Data:", req.body);
            const data = await this.createUseCase.execute(req.body);
            return res.status(201).json({
                success: true,
                message: "Tạo gói dịch vụ thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error creating package:", error);
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
                    error: "Không tìm thấy gói dịch vụ"
                });
            }

            return res.status(200).json({
                success: true,
                data: data
            });
        } catch (error: any) {
            console.error("Error getting package:", error);
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
            console.error("Error getting all packages:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetByType = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { type } = req.params;
            const data = await this.getUseCase.getByType(type);
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting packages by type:", error);
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
            console.error("Error getting available packages:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetPackageTypes = async (req: Request, res: Response): Promise<Response> => {
        try {
            const types = await this.getUseCase.getPackageTypes();
            return res.status(200).json({
                success: true,
                data: types
            });
        } catch (error: any) {
            console.error("Error getting package types:", error);
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
                    error: "Không tìm thấy gói dịch vụ"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Cập nhật gói dịch vụ thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error updating package:", error);
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
                    error: "Không tìm thấy gói dịch vụ để xóa"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Xóa gói dịch vụ thành công"
            });
        } catch (error: any) {
            console.error("Error deleting package:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

export default new PackageController();