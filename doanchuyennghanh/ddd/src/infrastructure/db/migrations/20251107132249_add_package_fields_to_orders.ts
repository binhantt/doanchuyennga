import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("orders", (table) => {
    // Thêm trường cho wedding package (có thể null)
    table.integer("wedding_package_id").unsigned().nullable().references("id").inTable("wedding_packages").onDelete("SET NULL");
    
    // Thêm trường ghi chú cho order
    table.text("notes").nullable();
    
    // Thêm trường loại order để phân biệt
    table.enum("order_type", ["dishes_only", "with_wedding_package", "with_service", "mixed"]).defaultTo("dishes_only");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("orders", (table) => {
    table.dropColumn("wedding_package_id");
    table.dropColumn("notes");
    table.dropColumn("order_type");
  });
}