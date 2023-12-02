import { FC } from 'react';

import styles from './styles.module.scss';
import { LabelColors } from '../../utils/constants';
import clsx from 'clsx';

type LabelProps = {
  text: string;
};

export const Label: FC<LabelProps> = ({ text }) => {
  return (
    <div
      className={clsx(styles.Label, {
        [styles[`Label_${LabelColors.get(text)}`]]: text
      })}
    >
      <span className={styles.Label__text}>{text}</span>
    </div>
  );
};
