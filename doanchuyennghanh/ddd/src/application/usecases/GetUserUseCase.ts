import { Knex } from "knex";
import { User } from "../../domain/entities/User";

export class GetContactsUseCase {
    constructor(private db: Knex) { }

    async execute(): Promise<Partial<User>[]> {
        const contacts = await this.db<User>("users")
            .select("id","username", "email", "phoneNumber", "address" , "role" , "accessToken", "refreshToken");
        console.log(contacts);
        if (contacts.length === 0) {
            throw new Error("Không tìm thấy liên hệ nào.");
        }
        return contacts;
    }
}
