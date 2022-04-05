export interface IMapper<T, K> {
  // rawDataToModel(rawData: any): T[];
  toDomain(data: T): K;
  toData(domain: K): T;
}
