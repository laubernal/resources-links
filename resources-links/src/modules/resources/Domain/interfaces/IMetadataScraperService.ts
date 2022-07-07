type MetadataResponse = {
  title: string;
  description: string;
};

export interface IMetadataScraperService {
  getMetadata(url: string): Promise<MetadataResponse>;
}
