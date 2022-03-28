// import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

export class Database {
  // private static client: Pool;
  private static _instance: Database;
  private readonly prismaClient: PrismaClient;

  constructor() {
    console.log(`Connecting to database...`);

    try {
      this.prismaClient = new PrismaClient();
    } catch (error: any) {
      throw new Error(`❌ Error connecting to ${process.env.PGDATABASE} database`);
    }

    console.log(`✔ Connected successfully to ${process.env.PGDATABASE} database`);
  }

  public static instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database();
    }

    return Database._instance;
  }

  public connection(): PrismaClient {
    return this.prismaClient;
  }

  // public static instance(): Pool {
  //   this.client = new Pool({
  //     max: 20,
  //     idleTimeoutMillis: 30000,
  //     connectionTimeoutMillis: 2000,
  //   });

  //   return this.client;
  // }

  // public static async query(query: string, values: any[]) {
  //   const pool = Database.instance();

  //   try {
  //     await pool.connect();

  //     return await pool.query(query, values);
  //   } catch (error: any) {
  //     throw new Error(chalk.red(`Error in Database - ${error.stack}`));
  //   }
  // }
}
