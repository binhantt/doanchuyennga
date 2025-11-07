import { Knex } from "knex";
import { ServiceDish } from "../../domain/entities/ServiceDish";
import { CreateServiceDishDTO } from "../../application/dtos/CreateServiceDishDTO";

export class ServiceDishRepository {
    constructor(private db: Knex) {}

    async create(data: CreateServiceDishDTO): Promise<ServiceDish> {
        const [id] = await this.db("service_dishes").insert({
            service_id: data.service_id,
            dish_id: data.dish_id,
            quantity: data.quantity
        });

        return new ServiceDish(id, data.service_id, data.dish_id, data.quantity);
    }

    async findById(id: number): Promise<ServiceDish | null> {
        const serviceDish = await this.db("service_dishes")
            .where({ id })
            .first();

        if (!serviceDish) {
            return null;
        }

        return new ServiceDish(
            serviceDish.id,
            serviceDish.service_id,
            serviceDish.dish_id,
            serviceDish.quantity,
            serviceDish.created_at,
            serviceDish.updated_at
        );
    }

    async findByServiceId(serviceId: number): Promise<ServiceDish[]> {
        const serviceDishes = await this.db("service_dishes")
            .where({ service_id: serviceId })
            .select("*");

        return serviceDishes.map(sd => new ServiceDish(
            sd.id,
            sd.service_id,
            sd.dish_id,
            sd.quantity,
            sd.created_at,
            sd.updated_at
        ));
    }

    async findByDishId(dishId: number): Promise<ServiceDish[]> {
        const serviceDishes = await this.db("service_dishes")
            .where({ dish_id: dishId })
            .select("*");

        return serviceDishes.map(sd => new ServiceDish(
            sd.id,
            sd.service_id,
            sd.dish_id,
            sd.quantity,
            sd.created_at,
            sd.updated_at
        ));
    }

    async findServiceWithDishes(serviceId: number): Promise<any[]> {
        const result = await this.db("service_dishes as sd")
            .join("dishes as d", "sd.dish_id", "d.id")
            .join("services as s", "sd.service_id", "s.id")
            .where("sd.service_id", serviceId)
            .select(
                "sd.id as service_dish_id",
                "sd.quantity",
                "d.id as dish_id",
                "d.name as dish_name",
                "d.description as dish_description",
                "d.price as dish_price",
                "d.image_url as dish_image",
                "s.id as service_id",
                "s.name as service_name"
            );

        return result;
    }

    async update(id: number, data: Partial<CreateServiceDishDTO>): Promise<ServiceDish | null> {
        await this.db("service_dishes")
            .where({ id })
            .update({
                ...data,
                updated_at: new Date()
            });

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("service_dishes")
            .where({ id })
            .del();

        return deleted > 0;
    }

    async deleteByServiceId(serviceId: number): Promise<boolean> {
        const deleted = await this.db("service_dishes")
            .where({ service_id: serviceId })
            .del();

        return deleted > 0;
    }

    async exists(serviceId: number, dishId: number): Promise<boolean> {
        const exists = await this.db("service_dishes")
            .where({ service_id: serviceId, dish_id: dishId })
            .first();

        return !!exists;
    }
}