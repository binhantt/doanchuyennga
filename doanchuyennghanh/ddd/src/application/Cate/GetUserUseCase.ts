import { Knex } from "knex";
import { Cate } from "../../domain/entities/Cate";
export class GetUserUseCase {
  constructor(private db: Knex) {}
  async executeAll(): Promise<Cate[]> {
    const data = await this.db("categories as c")
      .leftJoin("categories as p", "c.category_id", "p.id")
      .select(
        "c.id",
        "c.name as name",
        "c.image_url",
        "c.category_id",
        "p.name as parent_name"
      );

    return data;
  }
}