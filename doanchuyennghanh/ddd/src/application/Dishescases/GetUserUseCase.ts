import { Knex } from "knex";
import { Dishes } from "../../domain/entities/Dishes";
export class GetUserUseCase {
    constructor(private db: Knex) { }
  // Implementation of the use case to get user details
    async executeAll(): Promise<Dishes[]> {
    const users = await this.db<Dishes>("Dishes").select("*");
    return users;
  }
}