import { Pool } from "pg";
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'source@123',
  port: 5432,
});
