import { Knex } from "knex";

export class GetVouchersUseCase {
    constructor(private db: Knex) {}

    async execute(): Promise<any[]> {
        const vouchers = await this.db("vouchers")
            .select("*");
        
        if (vouchers.length === 0) {
            return []; // Trả về mảng rỗng thay vì ném lỗi
        }
        
        return vouchers;
    }
    
    async getById(id: number): Promise<any> {
        if (!id || id <= 0) {
            throw new Error("ID voucher không hợp lệ");
        }
        
        const voucher = await this.db("vouchers")
            .where({ id })
            .first();
            
        if (!voucher) {
            throw new Error("Không tìm thấy voucher với ID đã cung cấp");
        }
        
        return voucher;
    }
    
    async getByCode(code: string): Promise<any> {
        if (!code) {
            throw new Error("Mã voucher không hợp lệ");
        }
        
        const voucher = await this.db("vouchers")
            .where({ code })
            .first();
            
        if (!voucher) {
            throw new Error("Không tìm thấy voucher với mã đã cung cấp");
        }
        
        return voucher;
    }
}
