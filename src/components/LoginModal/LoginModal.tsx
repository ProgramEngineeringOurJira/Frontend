import { FC, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useField, useFormik } from 'formik';
import * as Yup from 'yup';

import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

type LoginModalProps = {
  placeholder?: string;
  type?: string;
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
});

export const LoginModal: FC<LoginModalProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {}}
      validationSchema={SignupSchema}
    >
      <Form>
        <div className={styles.LoginModal}>
          <FormElementWrapper>
            <TextForm text="Email" />
            <Field type="text" name="email" className={styles['LoginModal__input']} />
            <ErrorMessage name="email" component={'div'} className="error" />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Password" />
            <Field type="password" name="password" className={styles['LoginModal__input']} />
            <ErrorMessage name="password" component="div" className="error" />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Check password" />
            <Field type="password" name="confirmPassword" className={styles['LoginModal__input']} />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </FormElementWrapper>
        </div>
        <div className={styles['LoginModal__button-submit']}>
          <Button text="Sign up" type="primary" />
        </div>
      </Form>
    </Formik>
  );
};
