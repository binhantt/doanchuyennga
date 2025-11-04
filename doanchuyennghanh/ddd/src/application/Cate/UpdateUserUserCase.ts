import { Knex } from "knex";
import { Cate } from "../../domain/entities/Cate";
import { CreateCateDTO } from "../dtos/CreateCateDTO";
export class UpdateUserUserCase {
  constructor(private db: Knex) {}

  async execute(id: number, data: Cate): Promise<CreateCateDTO | null> {
    const { name, image_url , category_id } = data;
    if (!name?.trim() || !image_url?.trim()) {
      throw new Error("Các trường không được để trống");
    }
    const affectedRows = await this.db<Cate>("categories")
      .where("id", id)
      .update({ name, image_url , category_id });
    if (affectedRows === 0) {
      return null;
    }
    const row = await this.db<Cate>("categories").where("id", id).first();
    if (!row) return null;

    return new Cate(row.id, row.name, row.image_url , row.category_id );
  }
}
