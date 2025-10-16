import knex from "knex";
import config from "./knexfile";
import { testDatabaseConnection } from "./testConnection";


export default testDatabaseConnection;
export const db = knex(config);
