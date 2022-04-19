import { CategoryType } from '../../../../types/types';

export class UpdateResourceDto {
  constructor(
    public id: string,
    public title: string,
    public note: string,
    public link: string,
    public userId: string,
    public categories: CategoryType[]
  ) {}
}
