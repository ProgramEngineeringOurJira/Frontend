import { FC, useState } from 'react';
import clsx from 'clsx';

import styles from './styles.module.scss';

type NameTagProps = {
  text: string;
};

export const NameTag: FC<NameTagProps> = ({ text }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div onClick={() => setClicked(!clicked)} className={clsx(styles.NameTag, clicked ? styles.NameTagClicked : '')}>
      <span className={styles.NameTagText}>{text}</span>
    </div>
  );
};
