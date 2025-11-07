import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("service_dishes", (table) => {
    table
      .integer("service_id")
      .unsigned()
      .references("id")
      .inTable("services")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("service_dishes", (table) => {
    table.dropColumn("service_id");
  });
}

