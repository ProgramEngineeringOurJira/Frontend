import { FC, useContext, useEffect } from 'react';

import { Header } from '../../components/Header';
import { Board } from '../../components/Board';
import { PageLayout } from '../../components/PageLayout';

import styles from './styles.module.scss';
import { AuthContext } from '../../shared/context';
import { useGetRequest } from '../../hooks/useGetRequest';
import { Loader } from '../../ui-kit/Loader';
import { User } from '../../utils/types';

export const BoardPage: FC = () => {
  const { setNewUser } = useContext(AuthContext);

  const { isLoading, data } = useGetRequest<User>('profile');

  useEffect(() => {
    if (data && !isLoading) {
      setNewUser(data);
    }
  }, [isLoading, data]);

  return (
    <div className={styles.BoardPage}>
      <Header />
      <PageLayout>{isLoading ? <Loader /> : <Board />}</PageLayout>
    </div>
  );
};
