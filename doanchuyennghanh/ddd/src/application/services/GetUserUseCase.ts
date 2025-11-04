import { Knex } from "knex";
import { Service } from "../../domain/entities/Services";
export class GetUserUseCase {
  constructor(private db: Knex) {}
  async executeAll(): Promise<Service[]> {
    const data = await this.db("services").select("*");
    return data;
  }
}