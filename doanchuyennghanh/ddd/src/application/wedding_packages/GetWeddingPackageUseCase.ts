import { WeddingPackage } from "../../domain/entities/WeddingPackage";
import { Knex } from "knex";

export class GetWeddingPackageUseCase {
    constructor(private db: Knex) {}

    async execute(id: number): Promise<WeddingPackage | null> {
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

    async getAll(): Promise<WeddingPackage[]> {
        const weddingPackages = await this.db("wedding_packages")
            .select("*")
            .orderBy("id", "desc");

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

    async getAvailable(): Promise<WeddingPackage[]> {
        const weddingPackages = await this.db("wedding_packages")
            .select("*")
            .orderBy("price", "asc");

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
}