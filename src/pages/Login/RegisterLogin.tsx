import { FC } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { LoginModal } from '../../components/LoginModal';

import styles from './styles.module.scss';
import { Register } from '../../components/Register/Register';
import { LoginCheck } from '../../components/Login/Login';

export const RegisterLogin: FC = () => {
  return (
    <PageLayout>
      <div className={styles.Login}><LoginCheck /></div>
    </PageLayout>
  );
};
