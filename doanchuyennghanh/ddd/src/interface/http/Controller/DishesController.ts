import { Request, Response } from "express";
import { CreateDishesUseCase } from "../../../application/Dishescases/CreateUserUseCase";
import { GetUserUseCase } from "../../../application/Dishescases/GetUserUseCase";
import { DeleteUserUserCase } from "../../../application/Dishescases/DeleteUserUserCase";
import { UpdateUserUserCase } from "../../../application/Dishescases/UpdateUserUserCase";
import { db } from "../../../infrastructure/db";

class DisheController {
    private createDishesUseCase = new CreateDishesUseCase(db);
    private GetUserUseCase = new GetUserUseCase(db);
    private DeleteUserUserCase = new DeleteUserUserCase(db);
    private updateDishesUseCase = new UpdateUserUserCase(db);
    Create = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log(req.body);
            const dish = await this.createDishesUseCase.execute(req.body);
            return res.status(201).json({ data: dish });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

    GetAll = async (req: Request, res: Response) => {
        try {
            const users = await this.GetUserUseCase.executeAll();
            return res.status(200).json({ data: users });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    detele = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id, 10);
            console.log("Xóa thành công id " + id);
            await this.DeleteUserUserCase.execute(id);
            return res.status(200).json({ message: "Người thuc an  đã được xóa thành công" + id });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    };
    Update = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.params.id , req.body)
    try {
       const id = parseInt(req.params.id, 10);
        console.log(id)
        console.log(req.body)
      const updatedDish = await this.updateDishesUseCase.execute(id,req.body);
      if (!updatedDish) return res.status(404).json({ message: "Dish not found" });
      return res.status(200).json({  message: "Cập nhật món ăn thành công ✅",  data: updatedDish });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
};


export default new DisheController();
