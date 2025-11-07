import { Knex } from "knex";

export interface UpdateWeddingPackageDTO {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  guest_count?: number;
  venue_type?: 'indoor' | 'outdoor' | 'themed';
  image_url?: string;
}

export class UpdateWeddingPackageUseCase {
  constructor(private db: Knex) {}

  async execute(data: UpdateWeddingPackageDTO) {
    try {
      // Check if package exists
      const existingPackage = await this.db('wedding_packages').where('id', data.id).first();
      if (!existingPackage) {
        throw new Error('Wedding package not found');
      }

      // Validate fields if provided
      if (data.price !== undefined && data.price <= 0) {
        throw new Error('Price must be greater than 0');
      }

      if (data.guest_count !== undefined && data.guest_count <= 0) {
        throw new Error('Guest count must be greater than 0');
      }

      const updateData: any = {};

      if (data.name !== undefined) updateData.name = data.name.trim();
      if (data.description !== undefined) updateData.description = data.description?.trim() || null;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.guest_count !== undefined) updateData.guest_count = data.guest_count;
      if (data.venue_type !== undefined) updateData.venue_type = data.venue_type;
      if (data.image_url !== undefined) updateData.image_url = data.image_url;

      await this.db('wedding_packages').where('id', data.id).update(updateData);
      const updatedPackage = await this.db('wedding_packages').where('id', data.id).first();

      return updatedPackage;
    } catch (error) {
      console.error('Error in UpdateWeddingPackageUseCase:', error);
      throw error;
    }
  }
}