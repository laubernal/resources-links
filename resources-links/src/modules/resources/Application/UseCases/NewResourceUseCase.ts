import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Id, Text } from '../../../shared/Domain/vo';
import { CategoryVo, Link } from '../../Domain/vo';
import { Resource } from '../../Domain/entities/resource.entity';
import { NewResourceDto } from '../Dto';
import { AlreadyExistsError } from '../../../shared/Domain/Error';
import { IMetadataScraperService, IResourcesRepository } from '../../Domain/interfaces';

export class NewResourceUseCase implements IUseCase<string> {
  constructor(
    private resourcesRepository: IResourcesRepository,
    private metadataScraperService: IMetadataScraperService
  ) {}

  public async execute(resource: NewResourceDto): Promise<string> {
    try {
      const link = new Link(resource.link);
      const userId = new Id(resource.userId);
      const categories: CategoryVo[] = resource.categories.map(category => {
        return new CategoryVo(category.id, category.name);
      });

      await this.checkIfLinkAlreadyExists(link.value);

      if (resource.useMetadata) {
        if (this.isTitleOrNoteEmpty(resource)) {
          const metadata = await this.metadataScraperService.getMetadata(link.value);

          const title = metadata.title === '' ? 'No title' : metadata.title;
          const note = metadata.description === '' ? 'No note' : metadata.description;

          if (this.isTitleEmpty(resource)) {
            return this.buildAndSaveNewResource(title, link, resource.note, userId, categories);
          }

          if (this.isNoteEmpty(resource)) {
            return this.buildAndSaveNewResource(resource.title, link, note, userId, categories);
          }

          return this.buildAndSaveNewResource(title, link, note, userId, categories);
        }
      }

      const title = resource.title === '' ? 'No title' : resource.title;
      const note = resource.note === '' ? 'No note' : resource.note;

      return this.buildAndSaveNewResource(title, link, note, userId, categories);
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

  private isTitleOrNoteEmpty(resource: NewResourceDto): boolean {
    return resource.title === '' || resource.note === '';
  }

  private isTitleEmpty(resource: NewResourceDto): boolean {
    return resource.title === '' && resource.note !== '';
  }

  private isNoteEmpty(resource: NewResourceDto): boolean {
    return resource.title !== '' && resource.note === '';
  }

  private async buildAndSaveNewResource(
    title: string,
    link: Link,
    note: string,
    userId: Id,
    categories: CategoryVo[]
  ): Promise<string> {
    const newResource = Resource.build(new Text(title), link, new Text(note), userId, categories);

    await this.resourcesRepository.save(newResource);

    return newResource.id;
  }
}
