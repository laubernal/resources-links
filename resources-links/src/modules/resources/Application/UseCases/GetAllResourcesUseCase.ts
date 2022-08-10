import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Ordenation } from '../../../shared/Domain/filters/Ordenation';
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

      const field = new Text(getAllResourcesDto.orderBy);

      const filter = !getAllResourcesDto.search
        ? this.buildResourceFilter(userId, page, perPage, field, getAllResourcesDto.order)
        : this.buildResourceFilter(
            userId,
            page,
            perPage,
            field,
            getAllResourcesDto.order,
            getAllResourcesDto.search
          );

      const resources = await this.resourcesRepository.getAll(filter);

      return resources;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private buildResourceFilter(
    userId: Id,
    page: Number,
    perPage: Number,
    field: Text,
    order: string,
    search?: string
  ): ResourceFilter {
    if (order === Ordenation.ASC_FILTER) {
      return !search
        ? ResourceFilter.builder()
            .withUserId(userId)
            .paginate()
            .setPage(page)
            .setPerPage(perPage)
            .orderBy(field)
            .setAscOrder()
        : ResourceFilter.builder()
            .withUserId(userId)
            .withTitle(new Text(search))
            .paginate()
            .setPage(page)
            .setPerPage(perPage)
            .orderBy(field)
            .setAscOrder();
    }

    return !search
      ? ResourceFilter.builder()
          .withUserId(userId)
          .paginate()
          .setPage(page)
          .setPerPage(perPage)
          .orderBy(field)
          .setDescOrder()
      : ResourceFilter.builder()
          .withUserId(userId)
          .withTitle(new Text(search))
          .paginate()
          .setPage(page)
          .setPerPage(perPage)
          .orderBy(field)
          .setDescOrder();
  }

  private buildOrderByFilter(field: Text, order: string) {}
}
