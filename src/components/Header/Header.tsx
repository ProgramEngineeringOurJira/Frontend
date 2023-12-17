import { FC, useState } from 'react';

import { Information } from './Information/Information';
import { Navigation } from './Navigation';

type HeaderProps = {
  isInformationVisible?: boolean;
  isCreateSprintVisible?: boolean;
};

export const Header: FC<HeaderProps> = ({ isInformationVisible = true, isCreateSprintVisible = true }) => {
  return (
    <>
      <Navigation isCreateSprintVisible={isCreateSprintVisible} />
      {isInformationVisible ? <Information /> : <Information isVisible={false} />}
    </>
  );
};
