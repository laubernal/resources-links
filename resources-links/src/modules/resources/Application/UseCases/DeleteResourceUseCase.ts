import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class DeleteResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resourceId: string, userId: string): Promise<void> {
    console.log(`DELETE USE CASE RESOURCE ${resourceId} FROM USERID - ${userId}`);

    const deletedResource = await this.resourcesRepository.delete(resourceId, userId);

    if (!deletedResource) {
      throw new Error('Could not delete resource');
    }
  }
}
