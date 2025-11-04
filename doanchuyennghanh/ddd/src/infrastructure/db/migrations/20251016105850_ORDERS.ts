import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE");
    table.date("event_date").notNullable();
    table.integer("guest_count").notNullable();
    table.decimal("total_amount", 10, 2).notNullable();
    table.decimal("discount_amount", 10, 2).defaultTo(0);
    table.decimal("final_amount", 10, 2).notNullable();
    table.string("status").defaultTo("pending");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("orders");
}
