import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order_services", (table) => {
    table.increments("id").primary();
    table
      .integer("order_id")
      .unsigned()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .integer("service_id")
      .unsigned()
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");
    table.decimal("price", 10, 2).notNullable();
    
     table.foreign("service_id").references("services.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("order_services");
}