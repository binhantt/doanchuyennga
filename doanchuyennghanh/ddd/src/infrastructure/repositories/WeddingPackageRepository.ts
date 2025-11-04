import { Knex } from "knex";
import { WeddingPackage } from "../../domain/entities/WeddingPackage";
import { CreateWeddingPackageDTO } from "../../application/dtos/Createwedding_packagesDTO";

export class WeddingPackageRepository {
    constructor(private db: Knex) {}

    async create(data: CreateWeddingPackageDTO): Promise<WeddingPackage> {
        const [id] = await this.db("wedding_packages").insert({
            ...data
        });

        return new WeddingPackage(
            id,
            data.name,
            data.description,
            data.price,
            data.guest_count,
            data.venue_type,
            data.image_url
        );
    }

    async findById(id: number): Promise<WeddingPackage | null> {
        const weddingPackage = await this.db("wedding_packages")
            .where({ id })
            .first();

        if (!weddingPackage) {
            return null;
        }

        return new WeddingPackage(
            weddingPackage.id,
            weddingPackage.name,
            weddingPackage.description,
            weddingPackage.price,
            weddingPackage.guest_count,
            weddingPackage.venue_type,
            weddingPackage.image_url
        );
    }

    async findAll(): Promise<WeddingPackage[]> {
        const weddingPackages = await this.db("wedding_packages")
            .select("*")
            .orderBy("created_at", "desc");

        return weddingPackages.map(pkg => new WeddingPackage(
            pkg.id,
            pkg.name,
            pkg.description,
            pkg.price,
            pkg.guest_count,
            pkg.venue_type,
            pkg.image_url
        ));
    }

    async update(id: number, data: Partial<CreateWeddingPackageDTO>): Promise<WeddingPackage | null> {
        await this.db("wedding_packages")
            .where({ id })
            .update({
                ...data
            });

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("wedding_packages")
            .where({ id })
            .del();

        return deleted > 0;
    }
}