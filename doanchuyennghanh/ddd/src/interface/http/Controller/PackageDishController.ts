import { CreatePackageDishUseCase } from "../../../application/package_dishes/CreatePackageDishUseCase";
import { GetPackageDishUseCase } from "../../../application/package_dishes/GetPackageDishUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class PackageDishController {
    private createUseCase = new CreatePackageDishUseCase(db);
    private getUseCase = new GetPackageDishUseCase(db);

    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Package Dish Data:", req.body);
            const data = await this.createUseCase.execute(req.body);
            return res.status(201).json({
                success: true,
                message: "Thêm món ăn vào gói cưới thành công",
                data: data
            });
        } catch (error: any) {
            console.error("Error creating package dish:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    AddMultipleDishesToWeddingPackage = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { package_id, dishes } = req.body;
            
            if (!package_id || !dishes || !Array.isArray(dishes)) {
                return res.status(400).json({
                    success: false,
                    error: "Wedding Package ID và danh sách món ăn là bắt buộc"
                });
            }

            const data = await this.createUseCase.addMultipleDishesToWeddingPackage(package_id, dishes);
            return res.status(201).json({
                success: true,
                message: "Thêm nhiều món ăn vào gói cưới thành công",
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error adding multiple dishes to wedding package:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    AddMultipleDishesToGeneralPackage = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { general_package_id, dishes } = req.body;
            
            if (!general_package_id || !dishes || !Array.isArray(dishes)) {
                return res.status(400).json({
                    success: false,
                    error: "General Package ID và danh sách món ăn là bắt buộc"
                });
            }

            const data = await this.createUseCase.addMultipleDishesToGeneralPackage(general_package_id, dishes);
            return res.status(201).json({
                success: true,
                message: "Thêm nhiều món ăn vào gói dịch vụ thành công",
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error adding multiple dishes to general package:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };

    GetByPackageId = async (req: Request, res: Response): Promise<Response> => {
        try {
            const packageId = parseInt(req.params.packageId);
            if (isNaN(packageId)) {
                return res.status(400).json({
                    success: false,
                    error: "Package ID không hợp lệ"
                });
            }

            const data = await this.getUseCase.getByPackageId(packageId);
            return res.status(200).json({
                success: true,
                data: data,
                count: data.length
            });
        } catch (error: any) {
            console.error("Error getting dishes by package:", error);
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
            console.error("Error getting packages by dish:", error);
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
            console.error("Error getting all package dishes:", error);
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

            const data = await this.getUseCase.updateQuantity(id, quantity);
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy package dish"
                });
            }

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

            const deleted = await this.getUseCase.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: "Không tìm thấy package dish để xóa"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Xóa món ăn khỏi gói cưới thành công"
            });
        } catch (error: any) {
            console.error("Error deleting package dish:", error);
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    };
}

export default new PackageDishController();