import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id } from '../../../shared/Domain/vo';
import { Link, Text } from '../../Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { NewResourceDto } from '../Dto';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const validatedLink = new Link(resource.link);
      const validatedUserId = Id.validUuid(resource.userId);

      const newResource = Resource.build(
        new Text(resource.title),
        validatedLink,
        new Text(resource.note),
        validatedUserId
      );

      await this.resourcesRepository.save(newResource);

      return newResource.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
