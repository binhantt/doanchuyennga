import { PackageDish } from "../../domain/entities/PackageDish";
import { Knex } from "knex";

export class GetPackageDishUseCase {
    constructor(private db: Knex) {}

    async getByPackageId(packageId: number): Promise<any[]> {
        const packageDishes = await this.db("package_dishes")
            .join("dishes", "package_dishes.dish_id", "dishes.id")
            .join("wedding_packages", "package_dishes.package_id", "wedding_packages.id")
            .where("package_dishes.package_id", packageId)
            .select(
                "package_dishes.*",
                "dishes.name as dish_name",
                "dishes.description as dish_description", 
                "dishes.price as dish_price",
                "dishes.image_url as dish_image_url",
                "wedding_packages.name as package_name"
            );

        return packageDishes;
    }

    async getByDishId(dishId: number): Promise<any[]> {
        const packageDishes = await this.db("package_dishes")
            .join("dishes", "package_dishes.dish_id", "dishes.id")
            .join("wedding_packages", "package_dishes.package_id", "wedding_packages.id")
            .where("package_dishes.dish_id", dishId)
            .select(
                "package_dishes.*",
                "dishes.name as dish_name",
                "wedding_packages.name as package_name",
                "wedding_packages.price as package_price"
            );

        return packageDishes;
    }

    async getById(id: number): Promise<PackageDish | null> {
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

    async getAll(): Promise<any[]> {
        const packageDishes = await this.db("package_dishes")
            .join("dishes", "package_dishes.dish_id", "dishes.id")
            .join("wedding_packages", "package_dishes.package_id", "wedding_packages.id")
            .select(
                "package_dishes.*",
                "dishes.name as dish_name",
                "dishes.price as dish_price",
                "dishes.image_url as dish_image_url",
                "wedding_packages.name as package_name",
                "wedding_packages.price as package_price"
            )
            .orderBy("package_dishes.package_id", "asc");

        return packageDishes;
    }

    async updateQuantity(id: number, quantity: number): Promise<PackageDish | null> {
        if (quantity <= 0) {
            throw new Error("Số lượng phải lớn hơn 0!");
        }

        await this.db("package_dishes")
            .where({ id })
            .update({ quantity });

        return this.getById(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("package_dishes")
            .where({ id })
            .del();

        return deleted > 0;
    }
}