import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { DeleteError } from '../../../shared/Domain/Error/DeleteError';
import { Id } from '../../../shared/Domain/vo';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { DeleteResourceDto } from '../Dto';

export class DeleteResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: DeleteResourceDto): Promise<void> {
    try {
      const validatedResourceId = Id.validUuid(resource.resourceId);
      const validatedUserId = Id.validUuid(resource.userId);

      const deletedResource = await this.resourcesRepository.delete(
        validatedResourceId,
        validatedUserId
      );

      if (!deletedResource) {
        throw new DeleteError('Could not delete resource');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
