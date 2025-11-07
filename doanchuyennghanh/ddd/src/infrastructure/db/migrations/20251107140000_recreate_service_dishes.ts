import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Tạo lại bảng service_dishes
  await knex.schema.createTable("service_dishes", (table) => {
    table.increments("id").primary();
    table.integer("service_id").unsigned().notNullable().references("id").inTable("services").onDelete("CASCADE");
    table.integer("dish_id").unsigned().notNullable().references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamps(true, true);
    
    // Tạo unique constraint để tránh duplicate
    table.unique(["service_id", "dish_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("service_dishes");
}