import { Knex } from "knex";
import { Dishes } from "../../domain/entities/Dishes";
export class GetUserUseCase {
    constructor(private db: Knex) { }
    async executeAll(): Promise<Dishes[]> {
   const dishes = await this.db("Dishes as d")
  .leftJoin("Categories as c", "d.category_id", "c.id")
  .select(
    "d.id",
    "d.name",
    "d.description",
    "d.price",
    
    "d.image_url",
    "d.is_available",
    "c.name as category_name"
  );
    return dishes;
  }
}