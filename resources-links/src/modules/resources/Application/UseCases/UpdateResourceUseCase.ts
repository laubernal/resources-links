import { IUseCase } from '../../../shared/Application/UseCases/IUseCase';
import { IResourcesRepository } from '../../Domain/interfaces/IResourcesRepository';

export class UpdateResourceUseCase implements IUseCase<void> {
  constructor(private resourcesRepository: IResourcesRepository) {}

  public async execute(resource: any): Promise<void> {
    try {
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
