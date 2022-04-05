import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class NewResourceUseCase implements IUseCase<void> {
  constructor(private resourceRepository: IResourcesRepository) {}

  public async execute(title: string, note: string, link: string, userId: string): Promise<void> {
    const newResource = Resource.build(title, note, link, userId);

    await this.resourceRepository.save(newResource);
  }
}
