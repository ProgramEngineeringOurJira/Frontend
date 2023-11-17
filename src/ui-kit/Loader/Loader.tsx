import { FC } from 'react';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

const DEFAULT_LOADING_TEXT = 'Загрузка...';

export interface LoadingIndicatorProps {
  text?: string;
  className?: string;
}

export const Loader: FC<LoadingIndicatorProps> = ({ text, className }) => (
  <div className={clsx(styles.Spinner, className)}>
    <div className={styles.Spinner_icon} />
    {text ? <span className={styles.Spinner_text}>{text || DEFAULT_LOADING_TEXT}</span> : null}
  </div>
);
