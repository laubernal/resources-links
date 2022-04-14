import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';
import { Id } from '../../../shared/Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { Link } from '../../Domain/vo';
import { UpdateResourceDto } from '../Dto';

export class UpdateResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: UpdateResourceDto): Promise<string> {
    try {
      const validatedLink = new Link(resource.link);
      const validatedUserId = Id.validUuid(resource.userId);

      await this.checkIfLinkIsDifferent(resource.id, validatedLink.value);

      const updatedResource = new Resource(
        resource.id,
        resource.title,
        validatedLink.value,
        resource.note,
        validatedUserId
      );

      await this.resourcesRepository.update(updatedResource);

      return updatedResource.id;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async checkIfLinkIsDifferent(resourceId: string, newLink: string): Promise<void> {
    const savedLink = await this.resourcesRepository.getOneByResourceId(resourceId);

    if (savedLink.link === newLink) {
      throw new AlreadyExistsError('Link already exists');
    }
  }
}
