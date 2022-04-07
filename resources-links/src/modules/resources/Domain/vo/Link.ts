import { VO } from '../../../shared/Domain/vo';

export class Link extends VO {
  constructor(private link: string) {
    super();
    this.validate();
    // this.checkURL();
  }

  public get value(): string {
    return this.link;
  }

  private validate(): void {
    this.link = this.link.trim();
    this.isEmpty(this.link);
  }

  //   private checkURL() {

  //   }
}
