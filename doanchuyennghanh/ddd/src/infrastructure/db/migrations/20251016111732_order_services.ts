import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("order_services", (table) => {
    table.increments("id").primary();
    
    // FK với orders
    table
      .integer("order_id")
      .unsigned()
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    
    // FK với services
    table
      .integer("service_id")
      .unsigned()
      .references("id")
      .inTable("services")
      .onDelete("CASCADE"); // chỉ khai báo 1 lần

    table.decimal("price", 10, 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("order_services");
}
