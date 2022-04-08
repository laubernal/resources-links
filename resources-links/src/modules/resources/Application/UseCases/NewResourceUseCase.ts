import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id } from '../../../shared/Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { Link } from '../../Domain/vo';
import { NewResourceDto } from '../Dto';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const validatedLink = new Link(resource.link);
      const validatedId = Id.validUuid(resource.userId);

      const newResource = Resource.build(resource.title, validatedLink, resource.note, validatedId);

      await this.resourcesRepository.save(newResource);

      return newResource.id;
    } catch (error: any) {
      throw new Error();
    }
  }
}
