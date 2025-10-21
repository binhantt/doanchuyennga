import { Request, Response } from "express";
import {db}from "../../../infrastructure/db";
import { GetUserUseCase  } from "../../../application/Cate/GetUserUseCase";
import { CreateCateDTO } from "../../../application/dtos/CreateCateDTO";
import { CreateCateUseCase } from "../../../application/Cate/CreateUserUseCase";
import { DeleteUserUserCase } from "../../../application/Cate/DeleteUserUserCase";
import { UpdateUserUserCase } from "../../../application/Cate/UpdateUserUserCase";
import { Cate } from "../../../domain/entities/Cate";
class CateGoryController {

  GetALl  = async(req: Request, res: Response): Promise<Response> =>{ 
    try {
        const Get = new GetUserUseCase (db);
        const data = await Get.executeAll();
      return res.status(200).json({ success: true, data });
    }    catch (error: any) {   
        return res.status(400).json({ success: false, message: error.message });
    }
 }
  Creacte  = async(req: Request, res: Response): Promise<Response> =>{
    try {
      const { name, image_url } = req.body;
      const createCateUseCase = new CreateCateUseCase(db);
      const cateData: CreateCateDTO = {name,  image_url,};
      const newCate = await createCateUseCase.execute(cateData);
      
        return res.status(201).json({ success: true, data: newCate });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
    }
  delete = async(req: Request, res: Response): Promise<Response> =>{
    try {
      const id = req.params.id;
      await new DeleteUserUserCase(db).execute( Number(id));

      return res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
  updated =  async (req: Request, res: Response): Promise<Response> =>{
    try {
      const Update = new UpdateUserUserCase(db);
      const cateData: Cate = req.body;
      const result = await Update.execute( Number( req.params.id),cateData);
        if (!result) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục để cập nhật",
      });
    } 
      return res.status(200).json({ success: true, message: 'Category updated successfully' });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
export default new CateGoryController();