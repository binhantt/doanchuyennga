import { CreateSevervicesUseCase } from "../../../application/services/CreateUserUseCase";
import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";
class ServiceControllers {
    private  creact = new CreateSevervicesUseCase(db)
    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log(req.body);
            const data = await this.creact.execute(req.body);
            return res.status(201).json({ data: data });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

}
export default new ServiceControllers() ; 
