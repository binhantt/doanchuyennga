import {  CreateServiceDTO } from "../../application/dtos/CreateServicesDTO";
import { Service  } from "../../domain/entities/Services";
import { Knex } from "knex";

export class CreateSevervicesUseCase {
  constructor(private db: Knex) { }

  async execute(data: CreateServiceDTO): Promise<Service> {
    const { name, description, price, category_id, image_url, is_available } = data;
    if (!name || !price || !description || !image_url || !category_id ) {
      throw new Error("Tên  dich vu  và giá là bắt buộc!");
    }
  
    const [id] = await this.db("services").insert({
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
    const services: Service = {
      id,
      name,
      description,
      price,
      category_id,
      image_url,
      is_available,
    };

    return services;
  }
}

