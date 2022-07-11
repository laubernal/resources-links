import axios from 'axios';

type MetadataResponse = {
  title: string;
  description: string;
};

export class MetadataScraperService {
  public async getMetadata(url: string): Promise<MetadataResponse> {
    try {
      const metascraper = require('metascraper')([
        require('metascraper-description')(),
        require('metascraper-title')(),
      ]);

      const response = await axios.get(url);

      const html = await response.data;

      const metadata: MetadataResponse = await metascraper({ html, url });

      console.log('METADATA', metadata);

      return { title: metadata.title, description: metadata.description };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
