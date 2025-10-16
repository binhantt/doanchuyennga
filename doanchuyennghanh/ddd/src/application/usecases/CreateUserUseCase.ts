import { Knex } from "knex";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../../domain/entities/User";
export class CreateUserUseCase {
  constructor(private db: Knex) { }
  async execute(data: CreateUserDTO): Promise<User> {
    const { username, email, phoneNumber, address, password, role } = data;
    if (!data) throw new Error("Dữ liệu không hợp lệ");
    console.log(data);
    const newUser = new User(0, data.username, data.email, data.password || "", data.address, data.phoneNumber, "", "", data.role || "user");

    if (!username || !email || !phoneNumber || !address) {
      throw new Error("Vui lòng nhập đầy đủ thông tin (username, email, phoneNumber, address).");
    }
    console.log(data);

    const [id] = await this.db("users").insert({
      username: data.username,      // ✅ đúng giá trị
      email: data.email,            // ✅ đúng giá trị
      password: data.password || null, // 🔁 đổi chỗ với passwor  d
      address: data.address,        // ✅ đúng giá trị
      phoneNumber: data.phoneNumber,   // 🔁 đổi chỗ với phoneNumber
      role: data.role || 'user', 
    });
    newUser.id = id;
    return newUser;
  }
}
