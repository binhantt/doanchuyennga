import { Knex } from "knex";
import { Cate } from "../../domain/entities/Cate";
export class GetUserUseCase {
    constructor(private db: Knex) { }
    async executeAll(): Promise<Cate[]> {
   const data = await this.db("Categories").select("*");
    return data;
  }
}