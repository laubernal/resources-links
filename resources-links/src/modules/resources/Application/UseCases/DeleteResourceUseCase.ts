import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { DeleteError } from '../../../shared/Domain/Error/DeleteError';
import { Id } from '../../../shared/Domain/vo';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { DeleteResourceDto } from '../Dto';

export class DeleteResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: DeleteResourceDto): Promise<void> {
    try {
      const validatedResourceId = new Id(resource.resourceId);
      const validatedUserId = new Id(resource.userId);

      const deletedResource = await this.resourcesRepository.delete(
        validatedResourceId.value,
        validatedUserId.value
      );

      if (!deletedResource) {
        throw new DeleteError('Could not delete resource');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
