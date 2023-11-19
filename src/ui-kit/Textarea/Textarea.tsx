import { FC } from 'react';

import styles from './styles.module.scss';

type TextareaProps = {
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (a: any) => void;
};

export const Textarea: FC<TextareaProps> = ({ value, rows, placeholder, onChange }) => {
  return (
    <textarea rows={rows ? rows : 5} placeholder={placeholder} onChange={onChange} className={styles.Textarea}>
      {value}
    </textarea>
  );
};
