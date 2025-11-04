import { CreateWeddingPackageUseCase } from "../../../application/wedding_packages/CreateWeddingPackageUseCase";
import { GetWeddingPackageUseCase } from "../../../application/wedding_packages/GetWeddingPackageUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";

class WeddingPackageController {
    private createUseCase = new CreateWeddingPackageUseCase(db);
    private getUseCase = new GetWeddingPackageUseCase(db);

    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log("Wedding Package Data:", req.body);
            const data = await this.createUseCase.execute(req.body);
            return res.status(201).json({ 
                success: true,
                message: "Tạo gói cưới thành công",
                data: data 
            });
        } catch (error: any) {
            console.error("Error creating wedding package:", error);
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
                    error: "Không tìm thấy gói cưới" 
                });
            }

            return res.status(200).json({ 
                success: true,
                data: data 
            });
        } catch (error: any) {
            console.error("Error getting wedding package:", error);
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
            console.error("Error getting all wedding packages:", error);
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
            console.error("Error getting available wedding packages:", error);
            return res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }
    };
}

export default new WeddingPackageController();