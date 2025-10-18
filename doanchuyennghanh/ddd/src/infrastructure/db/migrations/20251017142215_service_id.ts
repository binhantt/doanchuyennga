import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("order_services", (table) => {
    table
      .foreign("service_id", "fk_order_services_service")
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("order_services", (table) => {
    table.dropForeign("service_id", "fk_order_services_service");
  });
}
