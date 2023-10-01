import { FC, useState } from 'react';

import styles from './styles.module.scss';
import { Information } from './Information/Information';
import { Navigation } from './Navigation';

export const Header: FC = () => {
  return (
    <>
      <Navigation />
      <Information />
    </>
  );
};
