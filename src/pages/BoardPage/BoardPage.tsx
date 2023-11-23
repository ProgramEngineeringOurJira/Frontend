import { FC, useContext, useEffect } from 'react';

import { Header } from '../../components/Header';
import { Board } from '../../components/Board';
import { PageLayout } from '../../components/PageLayout';

import styles from './styles.module.scss';
import { AuthContext } from '../../shared/context';
import { useGetRequest } from '../../hooks/useGetRequest';
import { Loader } from '../../ui-kit/Loader';

export const BoardPage: FC = () => {
  const { setNewUser } = useContext(AuthContext);

  const onLoadProfile = (data: any) => {
    console.log(data);
    setNewUser(data);
  };

  const { isLoading, mutate } = useGetRequest(onLoadProfile, 'profile');

  useEffect(() => {
    mutate({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.BoardPage}>
      <Header />
      <PageLayout>{isLoading ? <Loader /> : <Board />}</PageLayout>
    </div>
  );
};
