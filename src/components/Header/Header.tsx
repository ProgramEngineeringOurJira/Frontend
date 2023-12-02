import { FC, useState } from 'react';

import styles from './styles.module.scss';
import { Information } from './Information/Information';
import { Navigation } from './Navigation';

type HeaderProps = {
  isInformationVisible?: boolean;
};

export const Header: FC<HeaderProps> = ({ isInformationVisible = true }) => {
  return (
    <>
      <Navigation />
      {isInformationVisible ? <Information /> : <Information isVisible={false} />}
    </>
  );
};
