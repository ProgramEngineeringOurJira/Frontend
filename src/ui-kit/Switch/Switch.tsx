import { FC, useState } from 'react';
import styles from './styles.module.scss';

export const Switch: FC = () => {
  const [isActiveItem, setIsActiveItem] = useState(1);
  return (
    <div className={styles.Switch}>
      <div
        onClick={() => setIsActiveItem(1)}
        className={isActiveItem === 1 ? styles.Switch_item : styles.Switch_item_active}
      >
        To do
      </div>
      <div
        onClick={() => setIsActiveItem(2)}
        className={isActiveItem === 2 ? styles.Switch_item : styles.Switch_item_active}
      >
        In Progress
      </div>
      <div
        onClick={() => setIsActiveItem(3)}
        className={isActiveItem === 3 ? styles.Switch_item : styles.Switch_item_active}
      >
        In Review
      </div>
      <div
        onClick={() => setIsActiveItem(4)}
        className={isActiveItem === 4 ? styles.Switch_item : styles.Switch_item_active}
      >
        Done
      </div>
    </div>
  );
};
