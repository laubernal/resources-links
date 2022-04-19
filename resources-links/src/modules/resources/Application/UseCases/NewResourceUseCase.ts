import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Text } from '../../../shared/Domain/vo';
import { CategoryVo, Link } from '../../Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { NewResourceDto } from '../Dto';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const link = new Link(resource.link);
      const userId = Id.validUuid(resource.userId);
      const categories: CategoryVo[] = resource.categories.map(category => {
        return new CategoryVo(category.id, category.name);
      });

      await this.checkIfLinkAlreadyExists(link.value);

      const newResource = Resource.build(
        new Text(resource.title),
        link,
        new Text(resource.note),
        userId,
        categories
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
      throw new AlreadyExistsError('Link already exists');
    }
  }
}
