
import { Knex } from "knex"; 
export class  DeleteUserUserCase {
 constructor(private db: Knex) { }
    async execute(id: number): Promise<void> {
            if (!id || id <= 0) {
            throw new Error("ID thuc an  dùng không hợp lệ");
        } 
        console.log("da xoa id:", id);
        const user = await this.db("categories").where({ id: id }).del();
        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }
    } 
}