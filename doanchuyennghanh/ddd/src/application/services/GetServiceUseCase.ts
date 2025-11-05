import { Service } from "../../domain/entities/Services";
import { Knex } from "knex";

export class GetServiceUseCase {
    constructor(private db: Knex) {}

    async execute(id: number): Promise<Service | null> {
        const service = await this.db("services")
            .where({ id })
            .first();

        if (!service) {
            return null;
        }

        return new Service(
            service.id,
            service.name,
            service.description,
            service.price,
            service.category_id,
            service.image_url,
            service.is_available,
            service.created_at,
            service.updated_at
        );
    }

    async getAll(): Promise<any[]> {
        const services = await this.db("services")
            .join("categories", "services.category_id", "categories.id")
            .select(
                "services.*",
                "categories.name as category_name"
            )
            .orderBy("services.created_at", "desc");

        return services;
    }

    async getAvailable(): Promise<any[]> {
        const services = await this.db("services")
            .join("categories", "services.category_id", "categories.id")
            .where("services.is_available", true)
            .select(
                "services.*",
                "categories.name as category_name"
            )
            .orderBy("services.price", "asc");

        return services;
    }

    async getByCategory(categoryId: number): Promise<any[]> {
        const services = await this.db("services")
            .join("categories", "services.category_id", "categories.id")
            .where("services.category_id", categoryId)
            .select(
                "services.*",
                "categories.name as category_name"
            )
            .orderBy("services.price", "asc");

        return services;
    }

    async update(id: number, data: any): Promise<Service | null> {
        await this.db("services")
            .where({ id })
            .update({
                ...data,
                updated_at: new Date()
            });

        return this.execute(id);
    }

    async delete(id: number): Promise<boolean> {
        const deleted = await this.db("services")
            .where({ id })
            .del();

        return deleted > 0;
    }
}