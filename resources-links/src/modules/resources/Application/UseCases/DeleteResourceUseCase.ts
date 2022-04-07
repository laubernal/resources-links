import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { DeleteResourceDto } from '../Dto';

export class DeleteResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: DeleteResourceDto): Promise<void> {
    try {
      console.log(
        `DELETE USE CASE RESOURCE ${resource.resourceId} FROM USERID - ${resource.userId}`
      );

      const deletedResource = await this.resourcesRepository.delete(
        resource.resourceId,
        resource.userId
      );

      if (!deletedResource) {
        throw new Error('Could not delete resource');
      }
    } catch (error: any) {
      throw new Error();
    }
  }
}
