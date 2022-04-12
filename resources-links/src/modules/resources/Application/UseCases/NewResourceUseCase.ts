import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Text } from '../../../shared/Domain/vo';
import { Link } from '../../Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { NewResourceDto } from '../Dto';
import { LinkAlreadyExistsError } from '../../Domain/error';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const validatedLink = new Link(resource.link);
      const validatedUserId = Id.validUuid(resource.userId);

      await this.checkIfLinkAlreadyExists(validatedLink.value);

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

  private async checkIfLinkAlreadyExists(link: string): Promise<void> {
    const linkExists = await this.resourcesRepository.getOneByLink(link);

    if (linkExists) {
      throw new LinkAlreadyExistsError();
    }
  }
}
