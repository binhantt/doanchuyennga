import { Request, Response } from "express";
import { Knex } from "knex";
import { CreateOrderUseCase } from "../../../application/Ordercases/CreateUserUseCase";
import { GetOrdersUseCase } from "../../../application/Ordercases/GetUserUseCase";
import { db } from "../../../infrastructure/db";
import { CreateUserUseCase } from "../../../application/usecases/CreateUserUseCase";

class OrderController {
    constructor(private db: Knex) { }
    getAllOrders = async (req: Request, res: Response): Promise<Response> => {
        try {
            const getOrdersUseCase = new GetOrdersUseCase(this.db);
            const orders = await getOrdersUseCase.executeAll();
            return res.json({
                message: "Lấy tất cả đơn hàng thành công",
                data: orders
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };
    CreateOrderfood= async (req: Request, res: Response): Promise<Response> => {
        try {
            const { userId, user, order, dishes } = req.body;
            let finalUserId = userId;
            if (!finalUserId) {
                if (!user) {
                    return res.status(400).json({ error: "Cần userId hoặc thông tin user để tạo mới" });
                }
                const createUserUseCase = new CreateUserUseCase(this.db);
                const newUser = await createUserUseCase.execute(user);
                finalUserId = newUser.id;
            }
            const createOrderUseCase = new CreateOrderUseCase(this.db);
            const result = await createOrderUseCase.execute({
                userId: finalUserId,
                order,
                dishes
            });
            return res.status(201).json({
                message: "Tạo đơn hàng thành công",
                data: result
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    };

}

export default new OrderController(db);
