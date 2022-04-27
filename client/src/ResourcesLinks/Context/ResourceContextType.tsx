import { resourceType } from "../../types";

export interface ResourceContextType {
  fetchResourceList: () => Promise<void>;
  saveResource: () => Promise<void>;
  updateResource: () => Promise<void>;
  deleteResource: () => Promise<void>;
  resourcesList: resourceType[];
}
