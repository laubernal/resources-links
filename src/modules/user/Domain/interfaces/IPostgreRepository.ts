export interface IPostgreRepository<K> {
  getOneBy(column: string, value: string): Promise<K | undefined>;
  getAllBy(column: string, value: string): Promise<K | undefined>;
}
