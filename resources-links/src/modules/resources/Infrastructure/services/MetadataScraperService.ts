import axios from 'axios';

import { MetadataResponse } from '../../../../types/types';
import { MetadataError } from '../../../shared/Domain/Error';

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

      return metadata;
    } catch (error: any) {
      throw new MetadataError(error.message);
    }
  }
}
