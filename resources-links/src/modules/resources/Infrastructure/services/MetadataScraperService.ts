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
      console.log('before fetch');
      const response = await fetch(url);
      const html = await response.text();

      const metadata = await metascraper({ html, url });

      console.log('METADATA', metadata);

      return { title: '', description: '' };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
