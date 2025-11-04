import { Knex } from "knex";
import { PackageDish } from "../../domain/entities/PackageDish";
import { CreatePackageDishDTO } from "../../application/dtos/Createpackages_disheDTO .ts";

export class PackageDishRepository {
    constructor(private db: Knex) {}

    async create(data: CreatePackageDishDTO): Promise<PackageDish> {
        const [id] = await this.db("package_dishes").insert({
            package_id: data.package_id,
            dish_id: data.dish_id,
            quantity: data.quantity
        });

        return new PackageDish(id, data.package_id, data.dish_id, data.quantity);
    }

    async findById(id: number): Promise<PackageDish | null> {
        const packageDish = await this.db("package_dishes")
            .where({ id })
            .first();

        if (!packageDish) {
            return null;
        }

        return new PackageDish(
            packageDish.id,
            packageDish.package_id,
            packageDish.dish_id,
            packageDish.quantity
        );
    }

    async findByPackageId(packageId: number): Promise<PackageDish[]> {
        const packageDishes = await this.db("package_dishes")
            .where({ package_id: packageId })
            .select("*");

        return packageDishes.map(pd => new PackageDish(
            pd.id,
            pd.package_id,
            pd.dish_id,
            pd.quantity
        ));
    }

    async findByDishId(dishId: number): Promise<PackageDish[]> {
        const packageDishes = await this.db("package_dishes")
            .where({ dish_id: dishId })
            .select("*");

        return packageDishes.map(pd => new PackageDish(
            pd.id,
            pd.package_id,
            pd.dish_id,
            pd.quantity
        ));
    }

    async update(id: number, data: Partial<CreatePackageDishDTO>): Promise<PackageDish | null> {
        await this.db("package_dishes")
            .where({ id })
            .update(data);

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("package_dishes")
            .where({ id })
            .del();

        return deleted > 0;
    }

    async deleteByPackageId(packageId: number): Promise<boolean> {
        const deleted = await this.db("package_dishes")
            .where({ package_id: packageId })
            .del();

        return deleted > 0;
    }

    async exists(packageId: number, dishId: number): Promise<boolean> {
        const exists = await this.db("package_dishes")
            .where({ package_id: packageId, dish_id: dishId })
            .first();

        return !!exists;
    }
}