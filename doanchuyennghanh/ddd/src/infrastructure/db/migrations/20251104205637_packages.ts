import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("packages", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable();
    table.integer("max_guests").notNullable();
    table.string("package_type", 50).notNullable(); // 'wedding', 'birthday', 'corporate', etc.
    table.string("image_url", 500);
    table.boolean("is_available").defaultTo(true);
    table.timestamps(true, true); // created_at, updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("packages");
}