import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Text } from '../../../shared/Domain/vo';
import { CategoryVo, Link } from '../../Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { NewResourceDto } from '../Dto';
import { AlreadyExistsError } from '../../../shared/Domain/Error/AlreadyExistsError';
import { IMetadataScraperService } from '../../Domain/interfaces/IMetadataScraperService';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(
    private resourcesRepository: IResourcesRepository,
    private metadataScraperService: IMetadataScraperService
  ) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const link = new Link(resource.link);
      const userId = Id.validUuid(resource.userId);
      const categories: CategoryVo[] = resource.categories.map(category => {
        return new CategoryVo(category.id, category.name);
      });

      await this.checkIfLinkAlreadyExists(link.value);

      if (resource.useMetadata) {
        if (resource.title === '' || resource.note === '') {
          const metadata = await this.metadataScraperService.getMetadata(link.value);

          let title = metadata.title === '' ? 'No title' : metadata.title;
          let note = metadata.description === '' ? 'No note' : metadata.description;

          if (resource.title === '' && resource.note !== '') {
            const newResource = Resource.build(
              new Text(title),
              link,
              new Text(resource.note),
              userId,
              categories
            );

            await this.resourcesRepository.save(newResource);

            return newResource.id;
          }

          if (resource.title !== '' && resource.note === '') {
            const newResource = Resource.build(
              new Text(resource.title),
              link,
              new Text(note),
              userId,
              categories
            );

            await this.resourcesRepository.save(newResource);

            return newResource.id;
          }

          const newResource = Resource.build(
            new Text(title),
            link,
            new Text(note),
            userId,
            categories
          );

          await this.resourcesRepository.save(newResource);

          return newResource.id;
        }
      }

      let title = resource.title === '' ? 'No title' : resource.title;
      let note = resource.note === '' ? 'No note' : resource.note;

      const newResource = Resource.build(new Text(title), link, new Text(note), userId, categories);

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
