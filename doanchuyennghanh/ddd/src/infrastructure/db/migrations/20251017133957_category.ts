import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("image_url", 500).nullable();
    table.integer("category_id").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  // Xóa foreign key trong bảng dishes (và các bảng khác nếu có)
  const hasDishes = await knex.schema.hasTable("dishes");
  if (hasDishes) {
    await knex.schema.alterTable("dishes", (table) => {
      try {
        table.dropForeign(["category_id"], "fk_dishes_category");
      } catch (e) {
        console.log("⚠️ Không tìm thấy khóa ngoại fk_dishes_category — bỏ qua.");
      }
    });
  }

  // Sau đó mới drop bảng categories
  await knex.schema.dropTableIfExists("categories");
}
