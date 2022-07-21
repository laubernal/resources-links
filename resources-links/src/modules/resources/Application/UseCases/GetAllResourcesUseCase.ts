import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';
import { GetAllResourcesDto } from '../Dto/GetAllResourcesDto';

export class GetAllResourcesUseCase implements IUseCase<Resource> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(getAllResourcesDto: GetAllResourcesDto): Promise<Resource[]> {
    try {
      const resources = await this.resourcesRepository.getAllByUserId(
        getAllResourcesDto.userId,
        getAllResourcesDto.perPage,
        getAllResourcesDto.page
      );

      return resources;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
