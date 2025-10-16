import { Knex } from "knex";
import { Dishes } from "../../domain/entities/Dishes";
import { CreateDishesDTO } from "../dtos/CreateDishesDTO";
export class UpdateUserUserCase {
  constructor(private db: Knex) {}
  async execute(data: Dishes): Promise< CreateDishesDTO| null> {
    const { id, name, description, price, category, image_url, is_available } = data;

    // Update trong DB
    await this.db<Dishes>("dishes")
      .where({ id })
      .update({
        name,
        description,
        price,
        category,
        image_url,
        is_available,
      
      });

    // Lấy lại món ăn sau khi update
    const row = await this.db<Dishes>("dishes").where({ id }).first();

    if (!row) return null;

    return new Dishes(
      row.id,
      row.name,
      row.description,
      row.price,
      row.category,
      row.image_url,
      row.is_available
    );
  }
}
