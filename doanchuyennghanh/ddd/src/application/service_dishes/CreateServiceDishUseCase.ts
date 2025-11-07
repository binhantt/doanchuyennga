import { CreateServiceDishDTO } from "../dtos/CreateServiceDishDTO";
import { ServiceDish } from "../../domain/entities/ServiceDish";
import { ServiceDishRepository } from "../../infrastructure/repositories/ServiceDishRepository";
import { Knex } from "knex";

export class CreateServiceDishUseCase {
    private serviceDishRepository: ServiceDishRepository;

    constructor(private db: Knex) {
        this.serviceDishRepository = new ServiceDishRepository(db);
    }

    async execute(data: CreateServiceDishDTO): Promise<ServiceDish> {
        const { service_id, dish_id, quantity } = data;

        if (!service_id || !dish_id || !quantity) {
            throw new Error("Service ID, Dish ID và số lượng là bắt buộc!");
        }

        if (quantity <= 0) {
            throw new Error("Số lượng phải lớn hơn 0!");
        }

        // Kiểm tra service có tồn tại không
        const serviceExists = await this.db("services")
            .where({ id: service_id })
            .first();

        if (!serviceExists) {
            throw new Error("Dịch vụ không tồn tại!");
        }

        // Kiểm tra dish có tồn tại không
        const dishExists = await this.db("dishes")
            .where({ id: dish_id })
            .first();

        if (!dishExists) {
            throw new Error("Món ăn không tồn tại!");
        }

        // Kiểm tra xem đã có món này trong dịch vụ chưa
        const existingServiceDish = await this.serviceDishRepository.exists(service_id, dish_id);

        if (existingServiceDish) {
            throw new Error("Món ăn này đã có trong dịch vụ!");
        }

        return await this.serviceDishRepository.create(data);
    }

    async addMultipleDishesToService(serviceId: number, dishes: Array<{dish_id: number, quantity: number}>): Promise<ServiceDish[]> {
        const results: ServiceDish[] = [];

        for (const dish of dishes) {
            const serviceDish = await this.execute(new CreateServiceDishDTO(
                serviceId,
                dish.dish_id,
                dish.quantity
            ));
            results.push(serviceDish);
        }

        return results;
    }
}