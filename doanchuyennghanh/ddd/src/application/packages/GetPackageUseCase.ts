import { Package } from "../../domain/entities/Package";
import { Knex } from "knex";

export class GetPackageUseCase {
    constructor(private db: Knex) {}

    async execute(id: number): Promise<Package | null> {
        const packageData = await this.db("packages")
            .where({ id })
            .first();

        if (!packageData) {
            return null;
        }

        return new Package(
            packageData.id,
            packageData.name,
            packageData.description,
            packageData.price,
            packageData.max_guests,
            packageData.package_type,
            packageData.image_url,
            packageData.is_available,
            packageData.created_at,
            packageData.updated_at
        );
    }

    async getAll(): Promise<Package[]> {
        const packages = await this.db("packages")
            .select("*")
            .orderBy("created_at", "desc");

        return packages.map(pkg => new Package(
            pkg.id,
            pkg.name,
            pkg.description,
            pkg.price,
            pkg.max_guests,
            pkg.package_type,
            pkg.image_url,
            pkg.is_available,
            pkg.created_at,
            pkg.updated_at
        ));
    }

    async getByType(packageType: string): Promise<Package[]> {
        const packages = await this.db("packages")
            .where({ package_type: packageType.toLowerCase() })
            .select("*")
            .orderBy("price", "asc");

        return packages.map(pkg => new Package(
            pkg.id,
            pkg.name,
            pkg.description,
            pkg.price,
            pkg.max_guests,
            pkg.package_type,
            pkg.image_url,
            pkg.is_available,
            pkg.created_at,
            pkg.updated_at
        ));
    }

    async getAvailable(): Promise<Package[]> {
        const packages = await this.db("packages")
            .where({ is_available: true })
            .select("*")
            .orderBy("price", "asc");

        return packages.map(pkg => new Package(
            pkg.id,
            pkg.name,
            pkg.description,
            pkg.price,
            pkg.max_guests,
            pkg.package_type,
            pkg.image_url,
            pkg.is_available,
            pkg.created_at,
            pkg.updated_at
        ));
    }

    async update(id: number, data: Partial<Package>): Promise<Package | null> {
        await this.db("packages")
            .where({ id })
            .update({
                ...data,
                updated_at: new Date(),
            });

        return this.execute(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("packages")
            .where({ id })
            .del();

        return deleted > 0;
    }

    async getPackageTypes(): Promise<string[]> {
        const types = await this.db("packages")
            .distinct("package_type")
            .select("package_type");

        return types.map(t => t.package_type);
    }
}