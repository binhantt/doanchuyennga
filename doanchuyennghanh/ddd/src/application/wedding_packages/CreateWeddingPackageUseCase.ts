import { Knex } from "knex";
import { CreateWeddingPackageDTO } from "../dtos/Createwedding_packagesDTO";
import { WeddingPackage } from "../../domain/entities/WeddingPackage";

export class CreateWeddingPackageUseCase {
  constructor(private db: Knex) {}

  async execute(data: CreateWeddingPackageDTO): Promise<WeddingPackage> {
    try {
      // Validate required fields
      if (!data.name || !data.price || !data.guest_count) {
        throw new Error('Missing required fields: name, price, guest_count');
      }

      if (data.price <= 0) {
        throw new Error('Price must be greater than 0');
      }

      if (data.guest_count <= 0) {
        throw new Error('Guest count must be greater than 0');
      }

      const packageData = {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        price: data.price,
        guest_count: data.guest_count,
        venue_type: data.venue_type || 'indoor',
        image_url: data.image_url || null
      };

      const [id] = await this.db('wedding_packages').insert(packageData);
      const newPackageData = await this.db('wedding_packages').where('id', id).first();

      return new WeddingPackage(
        newPackageData.id,
        newPackageData.name,
        newPackageData.description,
        newPackageData.price,
        newPackageData.guest_count,
        newPackageData.venue_type,
        newPackageData.image_url
      );
    } catch (error) {
      console.error('Error in CreateWeddingPackageUseCase:', error);
      throw error;
    }
  }
}