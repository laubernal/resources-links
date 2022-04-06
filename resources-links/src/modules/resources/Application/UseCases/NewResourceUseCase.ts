import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(title: string, note: string, link: string, userId: string): Promise<string> {
    try {
      const newResource = Resource.build(title, note, link, userId);

      await this.resourcesRepository.save(newResource);

      return newResource.id;
    } catch (error: any) {
      throw new Error();
    }
  }
}
