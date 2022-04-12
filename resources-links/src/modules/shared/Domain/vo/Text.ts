export class Text {
  constructor(private text: string) {
    this.validate();
  }

  public get value(): string {
    return this.text;
  }

  private validate(): void {
    this.text.trim();
  }
}
