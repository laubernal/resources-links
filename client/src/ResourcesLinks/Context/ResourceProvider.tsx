import React from 'react';
import { ResourceContext } from './ResourceContext';

import { useResourceProvider } from '../Hooks/useResourceProvider';

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
  const resource = useResourceProvider();

  return <ResourceContext.Provider value={resource}>{children}</ResourceContext.Provider>;
};
