import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("services", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description");
    table.decimal("price", 10, 2);
    table.integer("category_id");
    table.string("image_url");
    table.boolean("is_available").defaultTo(true);
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
     await knex.schema.dropTableIfExists("services");
}

