import { FC } from 'react';

import { Header } from '../../components/Header';
import { Board } from '../../components/Board';
import { PageLayout } from '../../components/PageLayout';

import styles from './styles.module.scss';

export const BoardPage: FC = () => {
  return (
    <div className={styles.BoardPage}>
      <Header />
      <PageLayout>
        <Board />
      </PageLayout>
    </div>
  );
};
