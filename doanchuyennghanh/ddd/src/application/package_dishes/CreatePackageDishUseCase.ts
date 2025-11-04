import { CreatePackageDishDTO } from "../dtos/Createpackages_disheDTO";
import { PackageDish } from "../../domain/entities/PackageDish";
import { Knex } from "knex";

export class CreatePackageDishUseCase {
    constructor(private db: Knex) {}

    async execute(data: CreatePackageDishDTO): Promise<PackageDish> {
        const { package_id, general_package_id, dish_id, quantity } = data;

        if (!dish_id || !quantity) {
            throw new Error("Dish ID và số lượng là bắt buộc!");
        }

        if (!package_id && !general_package_id) {
            throw new Error("Phải có ít nhất một trong package_id hoặc general_package_id!");
        }

        if (quantity <= 0) {
            throw new Error("Số lượng phải lớn hơn 0!");
        }

        // Kiểm tra package tồn tại
        if (package_id) {
            const weddingPackageExists = await this.db("wedding_packages")
                .where({ id: package_id })
                .first();
            if (!weddingPackageExists) {
                throw new Error("Gói cưới không tồn tại!");
            }
        }

        if (general_package_id) {
            const packageExists = await this.db("packages")
                .where({ id: general_package_id })
                .first();
            if (!packageExists) {
                throw new Error("Gói dịch vụ không tồn tại!");
            }
        }

        // Kiểm tra dish có tồn tại không
        const dishExists = await this.db("dishes")
            .where({ id: dish_id })
            .first();

        if (!dishExists) {
            throw new Error("Món ăn không tồn tại!");
        }

        // Kiểm tra xem đã có món này trong gói chưa
        const whereClause: any = { dish_id };
        if (package_id) whereClause.package_id = package_id;
        if (general_package_id) whereClause.general_package_id = general_package_id;

        const existingPackageDish = await this.db("package_dishes")
            .where(whereClause)
            .first();

        if (existingPackageDish) {
            throw new Error("Món ăn này đã có trong gói!");
        }

        const [id] = await this.db("package_dishes").insert({
            package_id: package_id || null,
            general_package_id: general_package_id || null,
            dish_id,
            quantity
        });

        return new PackageDish(id, package_id || null, dish_id, quantity, general_package_id || null);
    }

    async addMultipleDishesToWeddingPackage(packageId: number, dishes: Array<{dish_id: number, quantity: number}>): Promise<PackageDish[]> {
        const results: PackageDish[] = [];

        for (const dish of dishes) {
            const packageDish = await this.execute(new CreatePackageDishDTO(
                dish.dish_id,
                dish.quantity,
                packageId, // wedding package
                null
            ));
            results.push(packageDish);
        }

        return results;
    }

    async addMultipleDishesToGeneralPackage(generalPackageId: number, dishes: Array<{dish_id: number, quantity: number}>): Promise<PackageDish[]> {
        const results: PackageDish[] = [];

        for (const dish of dishes) {
            const packageDish = await this.execute(new CreatePackageDishDTO(
                dish.dish_id,
                dish.quantity,
                null,
                generalPackageId // general package
            ));
            results.push(packageDish);
        }

        return results;
    }
}