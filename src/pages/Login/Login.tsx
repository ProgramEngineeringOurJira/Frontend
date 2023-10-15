import { FC } from 'react';

import { PageLayout } from '../../components/PageLayout';
import { LoginModal } from '../../components/LoginModal';

export const Login: FC = () => {
  return (
    <PageLayout>
      <div><LoginModal /></div>
    </PageLayout>
  );
};
