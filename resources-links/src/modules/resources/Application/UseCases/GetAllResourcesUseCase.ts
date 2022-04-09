import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class GetAllResourcesUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}
  
  public async execute(): Promise<void> {}
}
