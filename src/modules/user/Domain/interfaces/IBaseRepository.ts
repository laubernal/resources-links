export interface IBaseRepository<K> {
  getOneBy(column: string, value: string): Promise<K | undefined>;
  getAllBy(column: string, value: string): Promise<K | undefined>;
}
