import { VO } from "../../../shared/Domain/vo/VO";

export class Name extends VO {
    constructor(private name: string) {
        super();
        this.validate();
      }
    
      public get value(): string {
        return this.name;
      }
    
      private validate(): void {
        this.name = this.name.trim();
        this.isEmpty(this.name);
      }
}