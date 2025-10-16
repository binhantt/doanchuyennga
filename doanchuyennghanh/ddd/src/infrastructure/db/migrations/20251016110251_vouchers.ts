import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("vouchers", (table) => {
    table.increments("id").primary();
    table.string("code", 100).unique().notNullable();
    table.text("description");
    table.enum("discount_type", ["percent", "amount"]).notNullable();
    table.decimal("discount_value", 10, 2).notNullable();
    table.decimal("min_order_amount", 10, 2).defaultTo(0);
    table.integer("max_uses").defaultTo(1);
    table.integer("used_count").defaultTo(0);
    table.date("valid_from").notNullable();
    table.date("valid_to").notNullable();
    table.boolean("is_active").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("vouchers");
}
