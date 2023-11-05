import { FC, FormEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, useField, useFormik } from 'formik';
import * as Yup from 'yup';

import authSlice, { signUp, setCredentials } from '../../redux/features/auth/authSlice';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { TextForm } from '../../ui-kit/TextForm';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider/AuthProvider';
import { AuthFormFields } from '../AuthProvider/types';
import { AuthContext } from '../../shared/context';
import { useSendRequest } from '../../hooks/useSendRequest';
import { paths } from '../../utils/paths';


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
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { loginError, login, register, isLoading } = useAuth();

  const handleSubmit = (values: AuthFormFields) => {
    //if (authType === 'login') {
      //login(values);
    //  setPage(100);
    //} else {
    //  register(values, onClose);
    //  setPage(0);
    //}
  };

  const submitCallback = () => {
    if (isSuccess) {
      authContext?.setIsAuth(true)
      navigate(paths.board)
    }
  }

  const { sendRequest, isError, isLoading, queryResult, isSuccess } = useSendRequest(
    submitCallback,
    'registration'
  )

  const onSubmit = (event: FormEvent<HTMLFormElement>, values: Values) => {
    event.preventDefault()
    const sendObject = {
      email: values.email,
      password: values.password
    }

    sendRequest(sendObject)
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
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
