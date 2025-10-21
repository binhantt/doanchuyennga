import { Knex } from "knex";
import { Dishes } from "../../domain/entities/Dishes";
import { CreateDishesDTO } from "../dtos/CreateDishesDTO";
export class UpdateUserUserCase {
  constructor(private db: Knex) {}
  async execute( id : Number,data: Dishes): Promise< CreateDishesDTO| null> {
    const {  name, description, price, category_id, image_url, is_available } = data;
    console.log(id);
    // Update trong DB
    await this.db<Dishes>("dishes")
      .where(id)
      .update({
        name,
        description,
        price,
        category_id,
        image_url,
        is_available,
      
      });

    // Lấy lại món ăn sau khi update
    const row = await this.db<Dishes>("dishes").where(id).first();

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
