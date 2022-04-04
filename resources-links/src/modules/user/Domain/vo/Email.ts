import { EMAIL_REGEX } from '../../../../constants/user/emailRegex.constants';
import { EmailError } from '../error/EmailError';
import { normalizeableProviders } from '../utils/normalizableEmailProviders';
import { VO } from './VO';

export class Email extends VO {
  constructor(private email: string) {
    super();
    this.validate();
  }

  public get value(): string {
    return this.email;
  }

  private validate(): void {
    this.email = this.email.trim();
    this.isEmpty(this.email);
    this.email = this.normalizeEmail(this.email);
    const regexp = new RegExp(EMAIL_REGEX);

    if (!regexp.test(this.email)) {
      throw new EmailError('Please enter a valid email');
    }
  }

  private normalizeEmail(email: string): string {
    this.email = email.toLowerCase();
    const emailParts = this.email.split('@');

    if (emailParts.length !== 2) {
      throw new EmailError('Please enter a valid email');
    }

    let [username, domain] = emailParts;

    if (normalizeableProviders.hasOwnProperty(domain)) {
      if (normalizeableProviders[domain].hasOwnProperty('cut')) {
        username = username.replace(normalizeableProviders[domain].cut, '');
      }

      if (normalizeableProviders[domain].hasOwnProperty('aliasOf')) {
        domain = normalizeableProviders[domain].aliasOf;
      }
    }

    return `${username}@${domain}`;
  }
}
