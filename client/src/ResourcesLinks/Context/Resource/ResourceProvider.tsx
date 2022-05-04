import React from 'react';

import { useResourceProvider } from '../../Hooks/useResourceProvider';
import { ResourceContext } from './ResourceContext';

export const ResourceProvider = ({ children }: { children: React.ReactNode }) => {
  const resource = useResourceProvider();

  return <ResourceContext.Provider value={resource}>{children}</ResourceContext.Provider>;
};
