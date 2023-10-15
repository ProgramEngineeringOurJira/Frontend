import { FC, useState } from 'react';
import { Field, Form, Formik, FormikHelpers, useField, useFormik } from 'formik';

import styles from './styles.module.scss';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Input } from '../../ui-kit/Input';

interface Values {
  title: string;
  description: string;
  type: string;
}

type LoginModalProps = {
  placeholder?: string;
  type?: string;
};

export const LoginModal: FC<LoginModalProps> = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        type: 'add'
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {}}
    >
      <Form>
        <div>
          <FormElementWrapper>
            <TextForm text="Name" />
            <Input placeholder="Name" type="text" value={name} onChange={(value: string) => setName(value)} />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Email" />
            <Input placeholder="Email" type="text" value={email} onChange={(value: string) => setEmail(value)} />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Password" />
            <Input placeholder="Password" type="password" value={password} onChange={(value: string) => setPassword(value)} />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Check password" />
            <Input
              placeholder="Check password"
              type="password"
              value={checkPassword}
              onChange={(value: string) => setCheckPassword(value)}
            />
          </FormElementWrapper>
        </div>
      </Form>
    </Formik>
  );
};
