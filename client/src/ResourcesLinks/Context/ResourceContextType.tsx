import { categoryType, resourceType } from '../../types';

export interface ResourceContextType {
  fetchResourceList: () => Promise<void>;
  saveResource: (
    title: string,
    link: string,
    note: string,
    categories: categoryType[]
  ) => Promise<void>;
  updateResource: (
    id: string,
    title: string,
    note: string,
    link: string,
    categories: categoryType[]
  ) => Promise<void>;
  deleteResource: (resourceId: string) => Promise<void>;
  resourcesList: resourceType[];
}
