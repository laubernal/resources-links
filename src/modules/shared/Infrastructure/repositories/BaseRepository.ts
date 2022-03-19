import { ObjectDefinition } from '../../../../types/objectDefinition.types';
import { IMapper } from '../mappers/IMapper';
import { Database } from './Database';

export abstract class BaseRepository<T, K extends ObjectDefinition> {
  protected abstract mapper: IMapper<T, K>;

  constructor(private tableName: string) {}

  public async getOneBy(column: string, value: string): Promise<K | undefined> {
    try {
      const queryResult = await Database.query(
        `SELECT * FROM ${this.tableName} WHERE ${column} = $1`,
        [value]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      const resultModel = this.mapper.rawDataToModel(queryResult.rows[0]);

      return this.mapper.toDomain(resultModel[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public async getAllBy(column: string, value: string): Promise<K | undefined> {
    try {
      const queryResult = await Database.query(
        `SELECT * FROM ${this.tableName} WHERE ${column}=$1`,
        [value]
      );

      if (queryResult.rows.length === 0) {
        return undefined;
      }

      console.log(queryResult.rows[0]);
      return this.mapper.toDomain(queryResult.rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
