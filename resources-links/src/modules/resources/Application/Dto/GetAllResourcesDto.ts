export class GetAllResourcesDto {
  constructor(public userId: string, public perPage: number, public page: number) {}
}
