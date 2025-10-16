import { Knex } from "knex";
import { User } from "../../domain/entities/User";

export class UserRepository {
    constructor(private db: Knex) {}
  async findByEmail(email: string): Promise<User > {
    const user = await this.db("users").where({ email }).first();
    console.log(user);
    if (!user) return null;
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.address,
      user.phoneNumber,
      user.accessToken,
      user.refreshToken,
      user.role
    );
  }
  async updateTokens(userId: number, accessToken: string, refreshToken: string): Promise<void> {
    console.log("Updating tokens for user ID:", userId);
    console.log("New Access Token:", accessToken);
    console.log("New Refresh Token:", refreshToken);
    await this.db("users").where({ id: userId }).update({ accessToken, refreshToken });
  }
}
