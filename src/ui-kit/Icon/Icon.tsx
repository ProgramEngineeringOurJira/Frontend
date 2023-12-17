import { FC } from 'react';
import clsx from 'clsx';

import * as icons from './assets';

import styles from './styles.module.scss';

export type IconName = keyof typeof icons;

export interface IconProps {
  iconName: IconName;
  iconSize?: number;
  className?: string;
  color?: string;
}

export const Icon: FC<IconProps> = ({ iconName, className, color, iconSize }): JSX.Element | null => {
  const Glyph = icons[iconName];
  return <Glyph className={clsx([className, styles.Icon])} color={color} width={iconSize} height={iconSize} />;
};
