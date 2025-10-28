import { Knex } from "knex";
import { User } from "../../domain/entities/User";
export class UpdateUserUserCase {
  constructor(private db: Knex) {}

  async execute(id: number, data: Partial<User>): Promise<User | null> {
    const { username, email, phoneNumber, address, password } = data;
    if (!username?.trim() || !email?.trim() || !phoneNumber?.toString() || !address?.trim() || !password?.trim()) {
      throw new Error("Các trường không được để trống");
    }
    const affectedRows = await this.db<User>("users")
      .where("id", id)
      .update({ username, email, phoneNumber, address, password });
    if (affectedRows === 0) {
      return null;
    }
    const row = await this.db<User>("users").where("id", id).first();
    if (!row) return null;

    return new User(row.id, row.username, row.email, row.password, row.address, row.phoneNumber, row.acssToken, row.refreshToken, row.role);
  }
}
