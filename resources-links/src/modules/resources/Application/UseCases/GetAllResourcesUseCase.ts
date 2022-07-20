import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { Resource } from '../../Domain/entities/resource.entity';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class GetAllResourcesUseCase implements IUseCase<Resource> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(userId: string, skip: number, take: number): Promise<Resource[]> {
    try {
      const resources = await this.resourcesRepository.getAllByUserId(userId, skip, take);

      return resources;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
