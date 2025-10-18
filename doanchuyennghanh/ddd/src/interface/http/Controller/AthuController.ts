import { Request, Response } from "express";
import {db }from "../../../infrastructure/db";
import { UserRepository } from "../../../infrastructure/repositories/UserRepository";
import { LoginUserUseCase } from "../../../application/usecases/LoginUserUseCase";
import { TokenService } from "../../../infrastructure/security/TokenService";

class AuthController {
   login  = async(req: Request, res: Response): Promise<Response> =>{
    try {
      const { email, password } = req.body;

      const userRepo = new UserRepository(db);
      const tokenService = new TokenService();
      const loginUseCase = new LoginUserUseCase(userRepo, tokenService);    
      const result = await loginUseCase.execute(email, password);
      
      return res.status(200).json({ success: true, ...result });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new AuthController();
