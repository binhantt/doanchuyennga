import { Knex } from "knex";

export class DeleteWeddingPackageUseCase {
  constructor(private db: Knex) {}

  async execute(id: number) {
    try {
      // Check if package exists
      const existingPackage = await this.db('wedding_packages').where('id', id).first();
      if (!existingPackage) {
        throw new Error('Wedding package not found');
      }

      const deleted = await this.db('wedding_packages').where('id', id).del();
      
      if (deleted === 0) {
        throw new Error('Failed to delete wedding package');
      }

      return true;
    } catch (error) {
      console.error('Error in DeleteWeddingPackageUseCase:', error);
      throw error;
    }
  }
}