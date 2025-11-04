import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tables = ["dishes", "services"];

  // Lấy kiểu dữ liệu cột id trong bảng categories
  const [rows] = await knex.raw(`
    SELECT COLUMN_TYPE, COLUMN_KEY, EXTRA
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'categories'
      AND COLUMN_NAME = 'id'
      AND TABLE_SCHEMA = DATABASE()
  `);

  if (!rows.length) throw new Error("❌ Không tìm thấy bảng categories hoặc cột id!");

  const columnType = rows[0].COLUMN_TYPE; // vd: int(11) unsigned

  const isUnsigned = columnType.includes("unsigned");
  const isBig = columnType.includes("bigint");

  for (const tableName of tables) {
    const hasTable = await knex.schema.hasTable(tableName);
    if (!hasTable) continue;

    // Xóa FK cũ nếu có (đề phòng chạy lại migration)
    try {
      await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign(["category_id"], `fk_${tableName}_category`);
      });
    } catch {}

    // Xóa cột cũ (nếu sai kiểu)
    const hasColumn = await knex.schema.hasColumn(tableName, "category_id");
    if (hasColumn) {
      await knex.schema.alterTable(tableName, (table) => {
        table.dropColumn("category_id");
      });
    }

    // Tạo lại đúng kiểu dữ liệu
    await knex.schema.alterTable(tableName, (table) => {
      let col;
      if (isBig) col = table.bigInteger("category_id").nullable();
      else col = table.integer("category_id").nullable();

      if (isUnsigned) col.unsigned();
    });

    // Thêm khóa ngoại
    await knex.schema.alterTable(tableName, (table) => {
      table
        .foreign("category_id", `fk_${tableName}_category`)
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
    });

    console.log(`✅ Đã đồng bộ khóa ngoại fk_${tableName}_category với categories.id`);
  }
}

export async function down(knex: Knex): Promise<void> {
  const tables = ["dishes", "services"];

  for (const tableName of tables) {
    const hasTable = await knex.schema.hasTable(tableName);
    if (!hasTable) continue;

    const hasColumn = await knex.schema.hasColumn(tableName, "category_id");
    if (hasColumn) {
      await knex.schema.alterTable(tableName, (table) => {
        table.dropForeign("category_id", `fk_${tableName}_category`);
        table.dropColumn("category_id");
      });
    }
  }
}
