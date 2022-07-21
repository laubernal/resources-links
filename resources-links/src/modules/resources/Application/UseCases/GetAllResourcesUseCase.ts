import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Number } from '../../../shared/Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { GetAllResourcesDto } from '../Dto/GetAllResourcesDto';

export class GetAllResourcesUseCase implements IUseCase<Resource> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(getAllResourcesDto: GetAllResourcesDto): Promise<Resource[]> {
    try {
      const userId = new Id(getAllResourcesDto.userId);
      const perPage = new Number(getAllResourcesDto.perPage);
      const page = new Number(getAllResourcesDto.page);

      const resources = await this.resourcesRepository.getAllByUserId(
        userId.value,
        perPage.value,
        page.value
      );

      return resources;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
