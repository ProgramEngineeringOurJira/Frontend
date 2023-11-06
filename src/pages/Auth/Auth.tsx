import { FC, useState } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { Registration } from '../../components/Registration';
import { Login } from '../../components/Login';

import styles from './styles.module.scss';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <PageLayout>
      <div className={styles.Auth}>
        <span className={styles.Auth__title}>{isLogin ? 'Login' : 'Registration'}</span>
        <div>{isLogin ? <Login /> : <Registration />}</div>
        <span onClick={() => setIsLogin((prev) => !prev)} className={styles.Auth__switch}>
          {isLogin ? 'Sign up' : 'Sign in'}
        </span>
      </div>
    </PageLayout>
  );
};
