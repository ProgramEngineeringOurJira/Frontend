import { FC, useState } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { Registration } from '../../components/Registration';
import { Login } from '../../components/Login';

import styles from './styles.module.scss';

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <PageLayout>
      <span>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</span>
      <div className={styles.Login}>{isLogin ? <Login /> : <Registration />}</div>
      <span onClick={() => setIsLogin((prev) => !prev)}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</span>
    </PageLayout>
  );
};
