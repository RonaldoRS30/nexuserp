import mysql, { Pool, PoolOptions } from 'mysql2/promise';
import { env } from './env';

const options: PoolOptions = {
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
  charset: 'utf8mb4',
};

export const pool: Pool = mysql.createPool(options);

export async function query<T>(sql: string, params?: object): Promise<T> {
  const [rows] = await pool.query(sql, params as never);
  return rows as T;
}

export async function pingDatabase(): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
  } finally {
    connection.release();
  }
}
