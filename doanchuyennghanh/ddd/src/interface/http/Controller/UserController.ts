import { Request, Response } from 'express';
import { CreateUserDTO } from '../../../application/dtos/CreateUserDTO';
import { CreateUserUseCase } from '../../../application/usecases/CreateUserUseCase';
import { db } from '../../../infrastructure/db';
import { GetContactsUseCase } from '../../../application/usecases/GetUserUseCase';
import { DeleteUserUserCase } from '../../../application/usecases/DeleteUserUserCase';
import { UpdateUserUserCase } from '../../../application/usecases/UpdateUserUserCase';

class UserController {
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, email, phoneNumber, address , password  } = req.body;
      const useCase = new CreateUserUseCase(db);
    
      const newUser = await useCase.execute(
        new CreateUserDTO(username, email, phoneNumber, address , password , undefined, undefined, undefined)
      );
      console.log(newUser);
      return res.status(201).json({
        message: "Người dùng được tạo thành công",
        data: newUser,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
  getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const useCase = new GetContactsUseCase(db);
      const users = await useCase.execute();
      return res.status(200).json({ data: users });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
  deteleUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = parseInt(req.params.id, 10);
      
      const useCase = new DeleteUserUserCase(db);
      console.log("Xóa thành công id "+userId);
      await useCase.execute(userId);
      return res.status(200).json({ message: "Người dùng đã được xóa thành công"  + userId });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
  updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = parseInt(req.params.id, 10);
      const { username, email, phoneNumber, address , password  } = req.body;
      const useCase = new UpdateUserUserCase(db);
      const updatedUser = await useCase.execute(
        userId, { username, email, phoneNumber, address , password }
      );
      return res.status(200).json({
        message: "Người dùng được cập nhật thành công",
        data: updatedUser,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

}


export default new UserController();