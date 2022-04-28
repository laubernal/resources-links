import { CategoryType } from '../../../../types/types';

export class GetAllResourcesResponse {
  constructor(
    public id: string,
    public title: string,
    public link: string,
    public note: string,
    public userId: string,
    public createdAt: string | undefined,
    public categories: CategoryType[]
  ) {}
}
