export class GetAllResourcesDto {
  constructor(
    public userId: string,
    public perPage: number,
    public page: number,
    public search: string,
    public orderBy: string,
    public order: string
  ) {}
}
