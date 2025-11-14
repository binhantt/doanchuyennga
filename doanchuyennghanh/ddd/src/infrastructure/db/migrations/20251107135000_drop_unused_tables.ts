import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Xóa foreign key constraint trước
  await knex.schema.alterTable("orders", (table) => {
    table.dropForeign(["package_id"]);
    table.dropColumn("package_id");
  });
  
  // Xóa các bảng không sử dụng
  await knex.schema.dropTableIfExists("package_services");
  await knex.schema.dropTableIfExists("service_dishes");
  await knex.schema.dropTableIfExists("packages");
}

export async function down(knex: Knex): Promise<void> {
  // Tạo lại bảng packages
  await knex.schema.createTable("packages", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable();
    table.string("package_type").notNullable();
    table.boolean("is_available").defaultTo(true);
    table.timestamps(true, true);
  });

  // Tạo lại bảng service_dishes
  await knex.schema.createTable("service_dishes", (table) => {
    table.increments("id").primary();
    table.integer("service_id").unsigned().notNullable().references("id").inTable("services").onDelete("CASCADE");
    table.integer("dish_id").unsigned().notNullable().references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamps(true, true);
  });

  // Tạo lại bảng package_services
  await knex.schema.createTable("package_services", (table) => {
    table.increments("id").primary();
    table.integer("package_id").unsigned().notNullable().references("id").inTable("packages").onDelete("CASCADE");
    table.integer("service_id").unsigned().notNullable().references("id").inTable("services").onDelete("CASCADE");
    table.timestamps(true, true);
  });

  // Thêm lại package_id vào orders
  await knex.schema.alterTable("orders", (table) => {
    table.integer("package_id").unsigned().nullable().references("id").inTable("packages").onDelete("SET NULL");
  });
}