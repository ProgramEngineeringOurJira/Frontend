import { FC, useContext, useEffect } from 'react';

import { Header } from '../../components/Header';
import { Board } from '../../components/Board';
import { PageLayout } from '../../components/PageLayout';

import styles from './styles.module.scss';
import { AuthContext, UserT } from '../../shared/context';
import { useGetRequest } from '../../hooks/useGetRequest';
import { Loader } from '../../ui-kit/Loader';

export const BoardPage: FC = () => {
  const { setNewUser } = useContext(AuthContext);

  const { isLoading, data } = useGetRequest<UserT>('profile');

  useEffect(() => {
    if (data && !isLoading) {
      setNewUser(data);
    }
  }, []);

  return (
    <div className={styles.BoardPage}>
      <Header />
      <PageLayout>{isLoading ? <Loader /> : <Board />}</PageLayout>
    </div>
  );
};
