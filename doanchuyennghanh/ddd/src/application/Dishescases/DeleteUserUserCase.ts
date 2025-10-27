
import { Knex } from "knex"; 
export class  DeleteUserUserCase {
 constructor(private db: Knex) { }
    async execute(id: number): Promise<void> {
            if (!id || id <= 0) {
            throw new Error("ID thuc an  dùng không hợp lệ");
        } 
      
        const user =  await this.db("Dishes").where({ id: id }).del();;
        if (!user ) {
            throw new Error("Người dùng không tồn tại");
        }
    } 
}