import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { NewResourceDto } from '../Dto';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const newResource = Resource.build(
        resource.title,
        resource.note,
        resource.link,
        resource.userId
      );

      await this.resourcesRepository.save(newResource);

      return newResource.id;
    } catch (error: any) {
      throw new Error();
    }
  }
}
