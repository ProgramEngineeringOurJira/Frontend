import { FC } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type NameTagProps = {
  text: string;
  active: boolean;
  onClick: () => void;
};

export const NameTag: FC<NameTagProps> = ({ text, active, onClick }) => {
  return (
    <div onClick={onClick} className={clsx(styles.NameTag, active ? styles.NameTagClicked : '')}>
      <span className={styles.NameTagText}>{text}</span>
    </div>
  );
};
