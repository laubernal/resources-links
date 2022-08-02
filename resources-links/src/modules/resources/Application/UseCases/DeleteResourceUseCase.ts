import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { DeleteError, NotFoundError } from '../../../shared/Domain/Error';
import { Id } from '../../../shared/Domain/vo';
import { ResourceFilter } from '../../Domain/filters/ResourceFilter';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class DeleteResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resourceId: string): Promise<void> {
    try {
      const validatedResourceId = new Id(resourceId);

      const filter = ResourceFilter.builder().withResourceId(validatedResourceId);

      const resource = await this.resourcesRepository.getOne(filter);

      if (!resource) {
        throw new NotFoundError('Not found');
      }

      const deletedResource = await this.resourcesRepository.delete(resource);

      if (!deletedResource) {
        throw new DeleteError('Could not delete resource');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
