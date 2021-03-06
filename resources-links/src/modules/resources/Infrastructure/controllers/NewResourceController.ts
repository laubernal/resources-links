import { Request, Response } from 'express';
import { CategoryType } from '../../../../types/types';

import { bodyValidator, Controller, post, use } from '../../../shared/Infrastructure/decorators';
import { currentUser, requireAuth } from '../../../shared/Infrastructure/middlewares/auth';
import { NewResourceDto } from '../../Application/Dto';
import { NewResourceUseCase } from '../../Application/UseCases';
import { ResourcesRepository } from '../repositories/ResourcesRepository';
import { MetadataScraperService } from '../services/MetadataScraperService';

@Controller()
export class NewResourceController {
  @post('/resources/new')
  @use(requireAuth)
  @use(currentUser)
  @bodyValidator('link', 'categories')
  public async newResource(req: Request, res: Response): Promise<void> {
    try {
      const { title, link, note, categories, useMetadata } = req.body as {
        title: string;
        link: string;
        note: string;
        categories: CategoryType[];
        useMetadata: boolean;
      };

      const resourceRepository = new ResourcesRepository();
      const metadataScraperService = new MetadataScraperService();

      const newResourceDto = new NewResourceDto(
        title,
        note,
        link,
        req.currentUser!.id,
        categories,
        useMetadata
      );

      const resourceId = await new NewResourceUseCase(
        resourceRepository,
        metadataScraperService
      ).execute(newResourceDto);

      res.status(200).send({ resourceId });
    } catch (error: any) {
      console.log(error);
      res.status(400).send({
        msg: 'Error occurred',
        error: error.message,
      });
    }
  }
}
