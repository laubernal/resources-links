import { Pool } from 'pg';

export class Database {
  private static client: Pool;

  constructor() {}

  public static instance(): Pool {
    this.client = new Pool({
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    return this.client;
  }

  public static async query(query: string, values: any[]) {
    const pool = Database.instance();

    try {
      await pool.connect();

      return await pool.query(query, values);
    } catch (error: any) {
      throw new Error(`Error in Database - ${error.stack}`);
    }
  }
}
