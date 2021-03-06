import { CategoryType } from '../../../../types/types';

export class NewResourceDto {
  constructor(
    public title: string,
    public note: string,
    public link: string,
    public userId: string,
    public categories: CategoryType[],
    public useMetadata: boolean
  ) {}
}
