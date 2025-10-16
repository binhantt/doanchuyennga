import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("package_dishes", (table) => {
    table.increments("id").primary();
    table
      .integer("package_id")
      .unsigned()
      .references("id")
      .inTable("wedding_packages")
      .onDelete("CASCADE");
    table
      .integer("dish_id")
      .unsigned()
      .references("id")
      .inTable("dishes")
      .onDelete("CASCADE");
    table.integer("quantity").defaultTo(1);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("package_dishes");
}
