import { FC } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { LoginModal } from '../../components/LoginModal';

import styles from './styles.module.scss';

export const Login: FC = () => {
  return (
    <PageLayout>
      <div className={styles.Login}><LoginModal /></div>
    </PageLayout>
  );
};
