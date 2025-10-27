import { CreateDishesDTO } from "@application/dtos/CreateDishesDTO";
import { Dishes } from "../../domain/entities/Dishes";
import { Knex } from "knex";

export class CreateDishesUseCase {
  constructor(private db: Knex) { }

  async execute(data: CreateDishesDTO): Promise<Dishes> {
    const { name, description, price, category_id, image_url, is_available } = data;
    console.log(data)
    if (!name || !price || !description || !image_url || !category_id ) {
      throw new Error("Tên món ăn và giá là bắt buộc!");
    }
    // Insert vào bảng dishes
    const [id] = await this.db("dishes").insert({
      name,
      description,
      price,
      category_id,
      image_url,
      is_available,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Trả về entity Dishes
    const dish: Dishes = {
      id,
      name,
      description,
      price,
      category_id,
      image_url,
      is_available,
    };

    return dish;
  }
}
