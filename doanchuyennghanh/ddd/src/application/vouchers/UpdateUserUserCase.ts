import { Knex } from "knex";
import { CreateVoucherDTO } from "../dtos/createvoDTO";

export class UpdateVoucherUseCase {
  constructor(private db: Knex) {}

  // ✅ Hàm định dạng ngày hợp chuẩn MySQL
  private formatDateForMySQL(date: any): string | null {
    if (!date) return null;
    // Nếu là object Date
    if (date instanceof Date) {
      return date.toISOString().slice(0, 19).replace("T", " ");
    }
    // Nếu là chuỗi ISO hoặc "2025-12-31T17:00:00.000Z"
    if (typeof date === "string") {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().slice(0, 19).replace("T", " ");
      }
    }
    return date;
  }

  // ✅ Hàm convert string -> number nếu có thể
  private toNumberIfPossible(value: any): any {
    if (typeof value === "string" && !isNaN(value as any)) {
      return Number(value);
    }
    return value;
  }

  async execute(id: number, data: Partial<CreateVoucherDTO>): Promise<any> {
    if (!id || id <= 0) {
      throw new Error("ID voucher không hợp lệ");
    }

    // Kiểm tra voucher tồn tại
    const existingVoucher = await this.db("vouchers").where({ id }).first();
    if (!existingVoucher) {
      throw new Error("Voucher không tồn tại");
    }

    // Kiểm tra mã voucher trùng
    if (data.code && data.code !== existingVoucher.code) {
      const codeExists = await this.db("vouchers")
        .where({ code: data.code })
        .whereNot({ id })
        .first();
      if (codeExists) throw new Error("Mã voucher đã tồn tại trong hệ thống");
    }

    // ✅ Xử lý dữ liệu trước khi cập nhật
    const updatedData = {
      ...data,
      discount_value: this.toNumberIfPossible(data.discount_value),
      min_order_amount: this.toNumberIfPossible(data.min_order_amount),
      max_uses: this.toNumberIfPossible(data.max_uses),
      used_count: this.toNumberIfPossible(data.used_count),
      valid_from: this.formatDateForMySQL(data.valid_from || existingVoucher.valid_from),
      valid_to: this.formatDateForMySQL(data.valid_to || existingVoucher.valid_to),
    };

    // ✅ Cập nhật vào DB
    await this.db("vouchers").where({ id }).update(updatedData);

    // Trả về voucher đã cập nhật
    const updatedVoucher = await this.db("vouchers").where({ id }).first();
    return updatedVoucher;
  }
}
