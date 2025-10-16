import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Dishes", (table) => {
    table.increments("id").primary(); // PK
    table.string("name", 255).notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable();
    table.string("category", 100);
    table.string("image_url", 500);
    table.boolean("is_available").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("products");
}
