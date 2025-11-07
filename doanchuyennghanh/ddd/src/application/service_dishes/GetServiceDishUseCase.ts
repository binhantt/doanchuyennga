import { ServiceDish } from "../../domain/entities/ServiceDish";
import { ServiceDishRepository } from "../../infrastructure/repositories/ServiceDishRepository";
import { Knex } from "knex";

export class GetServiceDishUseCase {
    private serviceDishRepository: ServiceDishRepository;

    constructor(private db: Knex) {
        this.serviceDishRepository = new ServiceDishRepository(db);
    }

    async getById(id: number): Promise<ServiceDish | null> {
        if (!id || id <= 0) {
            throw new Error("ID không hợp lệ!");
        }

        return await this.serviceDishRepository.findById(id);
    }

    async getByServiceId(serviceId: number): Promise<ServiceDish[]> {
        if (!serviceId || serviceId <= 0) {
            throw new Error("Service ID không hợp lệ!");
        }

        return await this.serviceDishRepository.findByServiceId(serviceId);
    }

    async getByDishId(dishId: number): Promise<ServiceDish[]> {
        if (!dishId || dishId <= 0) {
            throw new Error("Dish ID không hợp lệ!");
        }

        return await this.serviceDishRepository.findByDishId(dishId);
    }

    async getServiceWithDishes(serviceId: number): Promise<any> {
        if (!serviceId || serviceId <= 0) {
            throw new Error("Service ID không hợp lệ!");
        }

        // Kiểm tra service có tồn tại không
        const serviceExists = await this.db("services")
            .where({ id: serviceId })
            .first();

        if (!serviceExists) {
            throw new Error("Dịch vụ không tồn tại!");
        }

        const dishes = await this.serviceDishRepository.findServiceWithDishes(serviceId);

        return {
            service: {
                id: serviceExists.id,
                name: serviceExists.name,
                description: serviceExists.description,
                price: serviceExists.price,
                category_id: serviceExists.category_id,
                image_url: serviceExists.image_url,
                is_available: serviceExists.is_available
            },
            dishes: dishes.map(dish => ({
                service_dish_id: dish.service_dish_id,
                quantity: dish.quantity,
                dish: {
                    id: dish.dish_id,
                    name: dish.dish_name,
                    description: dish.dish_description,
                    price: dish.dish_price,
                    image_url: dish.dish_image
                }
            }))
        };
    }

    async getAllServicesWithDishes(): Promise<any[]> {
        const services = await this.db("services")
            .where({ is_available: true })
            .select("*");

        const result = [];

        for (const service of services) {
            const serviceWithDishes = await this.getServiceWithDishes(service.id);
            result.push(serviceWithDishes);
        }

        return result;
    }
}