import { CreateWeddingPackageDTO } from "../dtos/Createwedding_packagesDTO";
import { WeddingPackage } from "../../domain/entities/WeddingPackage";
import { Knex } from "knex";

export class CreateWeddingPackageUseCase {
    constructor(private db: Knex) {}

    async execute(data: CreateWeddingPackageDTO): Promise<WeddingPackage> {
        const { 
            name, 
            description, 
            price, 
            guest_count, 
            venue_type,
            image_url
        } = data;

        if (!name || !price || !guest_count || !venue_type) {
            throw new Error("Tên gói cưới, giá, số khách và loại địa điểm là bắt buộc!");
        }

        if (price <= 0) {
            throw new Error("Giá phải lớn hơn 0!");
        }

        if (guest_count <= 0) {
            throw new Error("Số khách phải lớn hơn 0!");
        }

        if (!['indoor', 'outdoor', 'themed'].includes(venue_type)) {
            throw new Error("Loại địa điểm phải là: indoor, outdoor hoặc themed!");
        }

        const [id] = await this.db("wedding_packages").insert({
            name,
            description,
            price,
            guest_count,
            venue_type,
            image_url
        });

        // Trả về entity WeddingPackage
        const weddingPackage: WeddingPackage = {
            id,
            name,
            description,
            price,
            guest_count,
            venue_type,
            image_url
        };

        return weddingPackage;
    }
}