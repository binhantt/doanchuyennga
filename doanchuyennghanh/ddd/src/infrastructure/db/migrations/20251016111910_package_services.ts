
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("package_services", (table) => {
    table.increments("id").primary();
    table
      .integer("package_id")
      .unsigned()
      .references("id")
      .inTable("wedding_packages")
      .onDelete("CASCADE");
    table
      .integer("service_id")
      .unsigned()
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("package_services");
}
