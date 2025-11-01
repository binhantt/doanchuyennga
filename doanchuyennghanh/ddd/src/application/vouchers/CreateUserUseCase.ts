import { Knex } from "knex";
import { CreateVoucherDTO } from "../dtos/createvoDTO";
import { Voucher } from "../../domain/entities/Voucher";

export class CreateVoucherUseCase {
  constructor(private db: Knex) {}

  async execute(dto: CreateVoucherDTO): Promise<Voucher> {
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
      used_count,
    } = dto;
 console.log( "binhandto", dto);
  
    if (!code || !discount_type || !discount_value || !valid_from || !valid_to) {
      throw new Error("Vui lòng nhập đầy đủ thông tin bắt buộc.");
    }

  // 🔸 Check voucher trùng
    const existing = await this.db("vouchers").where({ code }).first();
    if (existing) throw new Error("Mã voucher đã tồn tại.");

    // 🔸 Thêm voucher
    const [id] = await this.db("vouchers").insert({
      code,
      description,
      discount_type,
      discount_value,
      min_order_amount: min_order_amount || 0,
      max_uses: max_uses || 1,
      used_count: used_count || 0,
      valid_from : valid_from || new Date().toISOString().split('T')[0],
      valid_to : valid_to || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      is_active: true || is_active
    });

    // 🔸 Lấy voucher vừa thêm ra và map sang domain entity
    const newVoucherRow = await this.db("vouchers").where({ id }).first();

    const newVoucher = new Voucher(
      newVoucherRow.id,
      newVoucherRow.code,
      newVoucherRow.discount_type,
      newVoucherRow.discount_value,
      newVoucherRow.valid_from,
      newVoucherRow.valid_to,
      newVoucherRow.description,
      newVoucherRow.min_order_amount,
      newVoucherRow.max_uses,
      newVoucherRow.is_active,
      newVoucherRow.used_count
    );

    return newVoucher;
  }
}
