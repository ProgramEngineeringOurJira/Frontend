import { FC, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';

import { TextForm } from '../../ui-kit/TextForm';
import { FormElementWrapper } from '../../ui-kit/FormElementWrapper';
import { Textarea } from '../../ui-kit/Textarea';
import { Button } from '../../ui-kit/Button';

import styles from './styles.module.scss';

interface Values {
  text: string;
}

type AddCommentModalProps = {
  hide: () => void;
};

export const AddCommentModal: FC<AddCommentModalProps> = ({ hide }) => {
  const [text, setText] = useState('');

  return (
    <Formik
      initialValues={{
        text: ''
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        hide();
      }}
    >
      <Form>
        <div className={styles.AddCommentModal}>
          <FormElementWrapper>
            <TextForm text="Comment" />
            <Textarea placeholder="Comment" value={text} onChange={(value: string) => setText(value)} />
          </FormElementWrapper>
        </div>
        <div className={styles['AddCommentModal__button-submit']}>
          <Button text="Add Comment" type="primary" />
        </div>
      </Form>
    </Formik>
  );
};
