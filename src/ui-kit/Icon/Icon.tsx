import React, { FC } from 'react';
import clsx from 'clsx';

import * as icons from './assets';

import styles from './styles.module.scss';

export type IconName = keyof typeof icons;

export type IconSizes = 'small' | 'medium' | 'big';

export interface IconProps {
    iconName: IconName;
    //iconSize?: IconSizes;
    className?: string;
    //stroke?: IconSizes;
}

export const Icon: FC<IconProps> = ({
    iconName,
    className,
}): JSX.Element | null => {
    const Glyph = icons[iconName];
    return (    
        <Glyph
            className={clsx([className, styles.Icon])}
            //color={color}
            //width={size}
            //height={size}
        />
    );
};