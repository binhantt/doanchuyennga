import { Request, Response } from "express";
import { db } from "../../../infrastructure/db";
import { GetAllWeddingPackagesUseCase } from "../../../application/wedding_packages/GetAllWeddingPackagesUseCase";
import { CreateWeddingPackageUseCase } from "../../../application/wedding_packages/CreateWeddingPackageUseCase";
import { CreateWeddingPackageDTO } from "../../../application/dtos/Createwedding_packagesDTO";

interface MulterRequest extends Request {
  file?: any;
}

class WeddingPackageController {
  private getAllUseCase = new GetAllWeddingPackagesUseCase(db);
  private createUseCase = new CreateWeddingPackageUseCase(db);

  GetAll = async (req: Request, res: Response) => {
    try {
      console.log("📦 Getting all wedding packages...");
      
      const packages = await this.getAllUseCase.execute();
      
      console.log(`✅ Found ${packages.length} wedding packages`);
      
      return res.status(200).json({
        success: true,
        data: packages
      });
    } catch (error: any) {
      console.error("❌ Error getting wedding packages:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  };

  Create = async (req: MulterRequest, res: Response) => {
    try {
      console.log("📦 Creating wedding package with data:", req.body);
      console.log("📁 File data:", req.file);
      
      const { name, description, price, guest_count, venue_type } = req.body;
      
      // Validate required fields
      if (!name || name.trim() === '') {
        return res.status(400).json({
          success: false,
          error: "Name is required"
        });
      }
      
      if (!price || isNaN(parseFloat(price))) {
        return res.status(400).json({
          success: false,
          error: "Valid price is required"
        });
      }
      
      if (!guest_count || isNaN(parseInt(guest_count))) {
        return res.status(400).json({
          success: false,
          error: "Valid guest count is required"
        });
      }
      
      const createDTO = new CreateWeddingPackageDTO(
        name.trim(),
        description?.trim() || '',
        parseFloat(price),
        parseInt(guest_count),
        venue_type || 'indoor',
        req.file ? `/uploads/${req.file.filename}` : ''
      );

      const newPackage = await this.createUseCase.execute(createDTO);

      console.log("✅ Wedding package created:", newPackage);

      return res.status(201).json({
        success: true,
        message: "Tạo gói cưới thành công",
        data: newPackage
      });
    } catch (error: any) {
      console.error("❌ Error creating wedding package:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  };

  Update = async (req: MulterRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { name, description, price, guest_count, venue_type } = req.body;
      
      console.log(`📝 Updating wedding package ${id} with data:`, req.body);

      // Check if package exists
      const existingPackage = await db('wedding_packages').where('id', id).first();
      if (!existingPackage) {
        return res.status(404).json({
          success: false,
          error: "Wedding package not found"
        });
      }

      const updateData: any = {};
      
      if (name !== undefined) updateData.name = name.trim();
      if (description !== undefined) updateData.description = description?.trim() || null;
      if (price !== undefined) updateData.price = parseFloat(price);
      if (guest_count !== undefined) updateData.guest_count = parseInt(guest_count);
      if (venue_type !== undefined) updateData.venue_type = venue_type;
      if (req.file) updateData.image_url = `/uploads/${req.file.filename}`;

      await db('wedding_packages').where('id', id).update(updateData);
      const updatedPackage = await db('wedding_packages').where('id', id).first();

      console.log("✅ Wedding package updated:", updatedPackage);

      return res.status(200).json({
        success: true,
        message: "Cập nhật gói cưới thành công",
        data: updatedPackage
      });
    } catch (error: any) {
      console.error("❌ Error updating wedding package:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  };

  Delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      console.log(`🗑️ Deleting wedding package ${id}`);

      // Check if package exists
      const existingPackage = await db('wedding_packages').where('id', id).first();
      if (!existingPackage) {
        return res.status(404).json({
          success: false,
          error: "Wedding package not found"
        });
      }

      await db('wedding_packages').where('id', id).del();

      console.log("✅ Wedding package deleted successfully");

      return res.status(200).json({
        success: true,
        message: "Xóa gói cưới thành công"
      });
    } catch (error: any) {
      console.error("❌ Error deleting wedding package:", error);
      return res.status(400).json({
        success: false,
        error: error.message || "Internal server error"
      });
    }
  };
}

const weddingPackageController = new WeddingPackageController();
export default weddingPackageController;