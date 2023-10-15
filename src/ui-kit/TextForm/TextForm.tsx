import { FC } from 'react';

import styles from './styles.module.scss';

type TextFormProps = {
  text: string;
};

export const TextForm: FC<TextFormProps> = ({ text }) => {
  return <span className={styles.TextForm}>{text}:</span>;
};
