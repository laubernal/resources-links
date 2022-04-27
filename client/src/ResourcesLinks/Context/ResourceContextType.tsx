export interface ResourceContextType {
  fetchResourceList: () => Promise<void>;
  saveResource: () => Promise<void>;
  updateResource: () => Promise<void>;
  deleteResource: () => Promise<void>;
  resourcesList: {
    id: string;
    title: string;
    note: string;
    link: string;
    userId: string;
    createdAt: string;
    categories: { id: string; name: string }[];
  }[];
}
