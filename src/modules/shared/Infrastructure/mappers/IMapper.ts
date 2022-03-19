export interface IMapper<T, K> {
  rawDataToModel(item: any): T[];
  toDomain(item: T): K;
  toData(item: K): T;
}
