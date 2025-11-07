import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("service_dishes", (table) => {
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("service_dishes", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
}

