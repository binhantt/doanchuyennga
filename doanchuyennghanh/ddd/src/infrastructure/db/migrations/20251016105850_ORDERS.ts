import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("orders", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.integer("package_id").unsigned().nullable();
        table.integer("voucher_id").unsigned().nullable();
        table.date("event_date").notNullable();
        table.integer("guest_count").notNullable();
        table.decimal("total_amount", 10, 2).notNullable();
        table.decimal("discount_amount", 10, 2).defaultTo(0);
        table.decimal("final_amount", 10, 2).notNullable();
        table
            .enum("status", ["pending", "confirmed", "cancelled", "completed"])
            .defaultTo("pending");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("orders");
}
