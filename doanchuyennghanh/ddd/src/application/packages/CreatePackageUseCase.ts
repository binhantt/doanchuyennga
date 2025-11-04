import { CreatePackageDTO } from "../dtos/CreatePackageDTO";
import { Package } from "../../domain/entities/Package";
import { Knex } from "knex";

export class CreatePackageUseCase {
    constructor(private db: Knex) {}

    async execute(data: CreatePackageDTO): Promise<Package> {
        const { 
            name, 
            description, 
            price, 
            max_guests, 
            package_type,
            image_url,
            is_available
        } = data;

        if (!name || !price || !max_guests || !package_type) {
            throw new Error("Tên gói, giá, số khách tối đa và loại gói là bắt buộc!");
        }

        if (price <= 0) {
            throw new Error("Giá phải lớn hơn 0!");
        }

        if (max_guests <= 0) {
            throw new Error("Số khách tối đa phải lớn hơn 0!");
        }

        const validPackageTypes = ['wedding', 'birthday', 'corporate', 'anniversary', 'graduation', 'other'];
        if (!validPackageTypes.includes(package_type.toLowerCase())) {
            throw new Error("Loại gói không hợp lệ. Chỉ chấp nhận: " + validPackageTypes.join(', '));
        }

        const [id] = await this.db("packages").insert({
            name,
            description,
            price,
            max_guests,
            package_type: package_type.toLowerCase(),
            image_url,
            is_available,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return new Package(
            id,
            name,
            description,
            price,
            max_guests,
            package_type.toLowerCase(),
            image_url,
            is_available,
            new Date(),
            new Date()
        );
    }
}