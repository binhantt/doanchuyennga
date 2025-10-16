import knex from "knex";
import config from "./knexfile";

import dotenv from "dotenv";

dotenv.config();
export async function testDatabaseConnection() {

  try {

    console.log("✅ DB config validated successfully.");

    // 2️⃣ Khởi tạo Knex instance
    const db = knex(config);

    // 3️⃣ Thử truy vấn test
    const result = await db.raw("SELECT 1+1 AS result");

    console.log("✅ Database connected successfully!");
    console.log("   Test query result:", result[0]);

    // 4️⃣ Hủy kết nối (để tránh treo process)
    await db.destroy();
  } catch (err: any) {
    console.error("❌ Database connection failed:");
    console.error("→", err.message);
    process.exit(1); // dừng tiến trình nếu lỗi
  }
}
