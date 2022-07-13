const URL = require('url').URL;

import { NotValidError } from '../../../shared/Domain/Error';
import { VO } from '../../../shared/Domain/vo';

export class Link extends VO {
  constructor(private link: string) {
    super();
    this.validate();
    if (!this.validUrl()) {
      throw new NotValidError('URL is not valid');
    }
  }

  public get value(): string {
    return this.link;
  }

  private validate(): void {
    this.link = this.link.trim();
    this.isEmpty(this.link);
  }

  private validUrl(): boolean {
    try {
      new URL(this.link);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}
