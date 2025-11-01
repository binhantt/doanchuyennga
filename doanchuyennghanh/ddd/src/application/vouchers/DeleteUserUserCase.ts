
import { Knex } from "knex"; 

export class DeleteVoucherUseCase {
  constructor(private db: Knex) {}
  
  async execute(voucherId: number): Promise<void> {
    if (!voucherId || voucherId <= 0) {
      throw new Error("ID voucher không hợp lệ");
    } 
    
    const voucher = await this.db("vouchers").where({ id: voucherId }).first();
    if (!voucher) {
      throw new Error("Voucher không tồn tại");
    }
    
    // Kiểm tra xem voucher đã được sử dụng chưa
    if (voucher.used_count > 0) {
      throw new Error("Không thể xóa voucher đã được sử dụng");
    }
    
    await this.db("vouchers").where({ id: voucherId }).delete();
  } 
}