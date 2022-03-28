export class VO {
    protected isEmpty(input: string): void {
      if (input.length === 0) {
        throw new Error('Input must be filled');
      }
      return;
    }
  }
  