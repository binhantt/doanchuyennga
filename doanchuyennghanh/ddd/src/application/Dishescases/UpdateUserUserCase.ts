import { Knex } from "knex";
import { Dishes } from "../../domain/entities/Dishes";
import { CreateDishesDTO } from "../dtos/CreateDishesDTO";

export class UpdateUserUserCase {
  constructor(private db: Knex) {}

  async execute(id: number, data: Dishes): Promise<CreateDishesDTO | null> {
    const { name, description, price, category_id, image_url, is_available } = data;

    console.log("📦 Input:", id, name, description, price, category_id, image_url, is_available);

    if (!id) return null;
    if (!name || !description || typeof price !== "number" || !category_id || !image_url) return null;

    // ⚙️ Update trong DB
    const query = this.db<Dishes>("dishes")
      .where({ id })
      .update({
        name,
        description,
        price,
        category_id,
        image_url,
        is_available,
      });

    console.log("📜 SQL:", query.toString());

    const result = await query;
    console.log("✅ Update thành công:", result);

    // ⚙️ Lấy lại bản ghi vừa update
    const row = await this.db<Dishes>("dishes").where({ id }).first();

    if (!row) return null;

    return new Dishes(
      row.id,
      row.name,
      row.description,
      row.price,
      row.category_id,
      row.image_url,
      row.is_available
    );
  }
}
