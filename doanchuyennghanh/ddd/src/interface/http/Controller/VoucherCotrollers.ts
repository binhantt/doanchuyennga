import { Request, Response } from "express";
import { CreateVoucherUseCase } from "../../../application/vouchers/CreateUserUseCase";
import { GetVouchersUseCase } from "../../../application/vouchers/GetUserUseCase";
import { UpdateVoucherUseCase } from "../../../application/vouchers/UpdateUserUserCase";
import { DeleteVoucherUseCase } from "../../../application/vouchers/DeleteUserUserCase";
import { CreateVoucherDTO } from "../../../application/dtos/createvoDTO";
import { db } from "../../../infrastructure/db";

class VoucherController {
  // 🟢 Lấy tất cả voucher
  getAllVouchers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const useCase = new GetVouchersUseCase(db);
      const vouchers = await useCase.execute();
      return res.status(200).json({ data: vouchers });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  // 🟢 Lấy voucher theo ID
  getVoucherById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      const useCase = new GetVouchersUseCase(db);
      const voucher = await useCase.getById(id);
      return res.status(200).json({ data: voucher });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // 🟢 Lấy voucher theo mã code
  getVoucherByCode = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { code } = req.params;
      const useCase = new GetVouchersUseCase(db);
      const voucher = await useCase.getByCode(code);
      return res.status(200).json({ data: voucher });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  };

  // 🟢 Tạo voucher mới
  createVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {
        code,
        description,
        discount_type,
        discount_value,
        min_order_amount,
        max_uses,
        valid_from,
        valid_to,
        is_active,
      } = req.body;
      console.log(req.body);
      const useCase = new CreateVoucherUseCase(db);
      const newVoucher = await useCase.execute(
        new CreateVoucherDTO(
          code,
          description,
          discount_type,
          discount_value,
          min_order_amount,
          max_uses,
          valid_from,
          valid_to,
          is_active
        )
      );

      return res.status(201).json({
        message: "Voucher được tạo thành công",
        data: newVoucher,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  // 🟢 Cập nhật voucher
  updateVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      const voucherData = req.body;
      const useCase = new UpdateVoucherUseCase(db);
      const updatedVoucher = await useCase.execute(id, voucherData);
      return res.status(200).json({
        message: "Voucher được cập nhật thành công",
        data: updatedVoucher,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };

  // 🟢 Xóa voucher
  deleteVoucher = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = parseInt(req.params.id, 10);
      const useCase = new DeleteVoucherUseCase(db);
      await useCase.execute(id);
      return res.status(200).json({ message: "Voucher đã được xóa thành công" });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export default new VoucherController();
