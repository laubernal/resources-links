import React from 'react';

import SignOut from '../../Auth/Components/Auth/SignOut/SignOut';
import ResourcesLinks from '../../ResourcesLinks/Components/ResourcesLinks';

function Resources(): JSX.Element {
  return (
    <>
      <SignOut />
      <ResourcesLinks />
    </>
  );
}

export default Resources;
