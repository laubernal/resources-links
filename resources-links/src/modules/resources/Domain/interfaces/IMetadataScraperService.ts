import { MetadataResponse } from "../../../../types/types";

export interface IMetadataScraperService {
  getMetadata(url: string): Promise<MetadataResponse>;
}
