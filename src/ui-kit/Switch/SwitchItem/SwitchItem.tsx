import { FC, useState } from 'react';
import styles from './styles.module.scss';

type SwitchItemProps = {
  isActiveProps: boolean;
  text: string;
};

export const SwitchItem: FC<SwitchItemProps> = ({ isActiveProps, text }) => {
  const [isActiveItem, setIsActiveItem] = useState(isActiveProps);
  return (
    <div className={styles.Switch}>
      <div
        onClick={() => setIsActiveItem(!isActiveItem)}
        className={isActiveItem === true ? styles.Switch_item_active : styles.Switch_item}
      >
        {text}
      </div>
    </div>
  );
};
