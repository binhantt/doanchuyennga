import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("orders", (table) => {
    // Thêm trường cho service (có thể null)
    table.integer("service_id").unsigned().nullable().references("id").inTable("services").onDelete("SET NULL");
    
    // Cập nhật enum order_type để bao gồm service
    table.dropColumn("order_type");
  });
  
  // Thêm lại column order_type với enum mới
  await knex.schema.alterTable("orders", (table) => {
    table.enum("order_type", [
      "dishes_only", 
      "with_wedding_package", 
      "with_service",
      "mixed"
    ]).defaultTo("dishes_only");
  });
}

export async function down(knex: Knex): Promise<void> {
  // Xóa foreign key constraint trước
  await knex.schema.alterTable("orders", (table) => {
    table.dropForeign(["service_id"]);
  });
  
  // Sau đó xóa column
  await knex.schema.alterTable("orders", (table) => {
    table.dropColumn("service_id");
    table.dropColumn("order_type");
  });
  
  // Khôi phục enum cũ
  await knex.schema.alterTable("orders", (table) => {
    table.enum("order_type", ["dishes_only", "with_wedding_package", "with_service", "mixed"]).defaultTo("dishes_only");
  });
}