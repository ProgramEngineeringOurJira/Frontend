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

type AddSprintModalProps = {
  hide: () => void;
};

export const AddSprintModal: FC<AddSprintModalProps> = ({ hide }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
            <Input placeholder="Title" type="text" value={title} onChange={(value: string) => setTitle(value)} />
          </FormElementWrapper>
          <FormElementWrapper>
            <TextForm text="Description" />
            <Input
              placeholder="Description"
              type="text"
              value={description}
              onChange={(value: string) => setDescription(value)}
            />
          </FormElementWrapper>
        </div>
        <div className={styles['AddCardModal__button-submit']}>
          <Button text="Add Task" type="primary" />
        </div>
      </Form>
    </Formik>
  );
};
