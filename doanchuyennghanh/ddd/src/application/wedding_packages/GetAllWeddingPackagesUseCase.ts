import { Knex } from "knex";
import { WeddingPackage } from "../../domain/entities/WeddingPackage";

export class GetAllWeddingPackagesUseCase {
  constructor(private db: Knex) {}

  async execute(): Promise<WeddingPackage[]> {
    try {
      const packagesData = await this.db('wedding_packages')
        .select('*')
        .orderBy('id', 'desc');
      
      return packagesData.map(pkg => new WeddingPackage(
        pkg.id,
        pkg.name,
        pkg.description,
        pkg.price,
        pkg.guest_count,
        pkg.venue_type,
        pkg.image_url
      ));
    } catch (error) {
      console.error('Error in GetAllWeddingPackagesUseCase:', error);
      throw new Error('Failed to get wedding packages');
    }
  }
}