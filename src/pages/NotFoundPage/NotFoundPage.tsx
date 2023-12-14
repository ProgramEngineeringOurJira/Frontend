import { FC } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { Button } from '../../ui-kit/Button';
import { paths } from '../../utils/paths';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate(paths.home);
  };

  return (
    <div>
      <Header isInformationVisible={false} />
      <PageLayout>
        <div className={styles.NotFoundPage}>
          <div className={styles.NotFoundPage__text}>Oops... Page not found.</div>
          <Button text={'Back to Homepage'} type="primary" to={paths.home}/>
        </div>
      </PageLayout>
    </div>
  );
};
