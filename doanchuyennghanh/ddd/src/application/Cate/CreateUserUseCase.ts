import { CreateCateDTO } from "@application/dtos/CreateCateDTO";
import { Cate } from "../../domain/entities/Cate";
import { Knex } from "knex";

export class CreateCateUseCase {
  constructor(private db: Knex) { }

  async execute(data: CreateCateDTO): Promise<Cate> {
    const { name , image_url } = data;
    console.log(data)

    const [id] = await this.db("categories").insert({
      name,
      image_url,
    });

    const Cate: Cate = {
      id,
      name,
      image_url,
   
    };
    return Cate;
  }
}
