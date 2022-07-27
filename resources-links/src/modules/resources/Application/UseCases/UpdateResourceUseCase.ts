import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';
import { Id } from '../../../shared/Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { CategoryVo, Link } from '../../Domain/vo';
import { UpdateResourceDto } from '../Dto';

export class UpdateResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: UpdateResourceDto): Promise<string> {
    try {
      const validatedLink = new Link(resource.link);
      const validatedUserId = new Id(resource.userId);
      const validatedResourceId = new Id(resource.id);
      const categories: CategoryVo[] = resource.categories.map(category => {
        return new CategoryVo(category.id, category.name);
      });

      await this.checkIfLinkIsDifferent(validatedResourceId, validatedLink.value);

      const updatedResource = new Resource(
        resource.id,
        resource.title,
        validatedLink.value,
        resource.note,
        validatedUserId.value,
        categories
      );

      await this.resourcesRepository.update(updatedResource);

      return updatedResource.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkIfLinkIsDifferent(resourceId: Id, newLink: string): Promise<void> {
    const filter = ResourceFilter.builder().withResourceId(resourceId);

    const savedLink = await this.resourcesRepository.getOne(filter);

    if (savedLink?.link === newLink && savedLink?.id !== resourceId.value) {
      throw new AlreadyExistsError('Link already exists');
    }
  }
}
