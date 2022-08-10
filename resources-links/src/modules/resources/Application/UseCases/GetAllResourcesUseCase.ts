import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Number, Text } from '../../../shared/Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { GetAllResourcesDto } from '../Dto';

export class GetAllResourcesUseCase implements IUseCase<Resource> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(getAllResourcesDto: GetAllResourcesDto): Promise<Resource[]> {
    try {
      const userId = new Id(getAllResourcesDto.userId);
      const perPage = new Number(getAllResourcesDto.perPage);
      const page = new Number(getAllResourcesDto.page);
      const search = new Text(getAllResourcesDto.search);
      const order = getAllResourcesDto.order;

      const filter = ResourceFilter.builder()
        .withUserId(userId)
        .withTitle(search)
        .paginate()
        .setPage(page)
        .setPerPage(perPage)
        .orderByCreationDate(order);

      const resources = await this.resourcesRepository.getAll(filter);

      return resources;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
