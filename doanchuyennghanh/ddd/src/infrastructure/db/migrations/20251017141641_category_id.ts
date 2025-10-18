import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn("Dishes", "category_id");
  if (!hasColumn) {
    await knex.schema.alterTable("Dishes", (table) => {
      table.integer("category_id").unsigned().nullable();
    });
  }

  const foreignExists = await knex.raw(`
    SELECT CONSTRAINT_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
    WHERE TABLE_NAME = 'Dishes' AND COLUMN_NAME = 'category_id' AND CONSTRAINT_SCHEMA = DATABASE()
  `);

  if (foreignExists[0].length === 0) {
    await knex.schema.alterTable("Dishes", (table) => {
      table
        .foreign("category_id", "fk_dishes_category")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("Dishes", (table) => {
    table.dropForeign("category_id", "fk_dishes_category");
    table.dropColumn("category_id");
  });
}
