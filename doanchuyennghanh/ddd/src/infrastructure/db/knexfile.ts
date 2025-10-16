import type { Knex } from "knex";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const config: Knex.Config = {
  client: (process.env.DB_CLIENT as string) || "mysql2", // Fallback mặc định
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",   // ✅ chuẩn địa chỉ localhost
    user: process.env.DB_USER || "root",        // ✅ mặc định root
    password: process.env.DB_PASSWORD||"",    // ✅ chuỗi rỗng nếu không có mật khẩu
    database: process.env.DB_NAME || "web_tiec_cuoi", // ✅ mặc định DB
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
    extension: "ts",
  },
};

export default config;
