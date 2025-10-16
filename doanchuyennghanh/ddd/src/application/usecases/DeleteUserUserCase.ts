
import { Knex } from "knex"; 
export class  DeleteUserUserCase {
 constructor(private db: Knex) { }
    async execute(userId: number): Promise<void> {
            if (!userId || userId <= 0) {
            throw new Error("ID người dùng không hợp lệ");
        } 
        const user = await this.db("users").where({ id: userId }).first();
        if (!user) {
            throw new Error("Người dùng không tồn tại");
        }
    } 
}