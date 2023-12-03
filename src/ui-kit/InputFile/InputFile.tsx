import { FC } from 'react';

import styles from './styles.module.scss';

type InputProps = {
  onChange: (a: any) => void;
};

export const InputFile: FC<InputProps> = ({ onChange }) => {
  return <input type="file" onChange={onChange} className={styles.InputFile}></input>;
};
