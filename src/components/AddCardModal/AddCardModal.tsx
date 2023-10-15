import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik, FormikHelpers, useField, useFormik } from 'formik';

import columnsSlice from '../../redux/features/columns/columnsSlice';
import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Input } from '../../ui-kit/Input';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

interface Values {
  title: string;
  description: string;
  type: string;
}

type AddCardModalProps = {
  hide: () => void;
}

export const AddCardModal: FC<AddCardModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('Задача');
  const [description, setDescription] = useState('Описание');
  const [newColIndex, setNewColIndex] = useState(1);

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        type: 'add'
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        if (values.type === 'add') {
          dispatch(
            columnsSlice.actions.addTask({
              title,
              description,
              newColIndex
            })
          );
        }
        hide();
      }}
    >
      <Form>
        <div className={styles.AddCardModal}>
        <FormElementWrapper>
          <TextForm text="Title" />
          <Input placeholder="Title" type="text" />
        </FormElementWrapper>
        <FormElementWrapper>
          <TextForm text="Description" />
          <Input placeholder="Description" type="text" />
        </FormElementWrapper>
        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Task" type='primary' />
        </div>
      </Form>
    </Formik>
  );
};
