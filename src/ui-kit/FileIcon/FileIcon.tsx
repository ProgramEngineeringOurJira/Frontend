import { FC } from 'react';
import clsx from 'clsx';

import * as icons from './assets';

import styles from './styles.module.scss';

export type IconName = keyof typeof icons;

export type IconSizes = 'small' | 'medium' | 'big';

export interface IconProps {
  filename: string;
  className?: string;
}

export const FileIcon: FC<IconProps> = ({ filename, className }): JSX.Element | null => {
  const getIcon = () => {
    if (/\.(jpe?g|png|gif|bmp|tiff|psd|raw|cr2|nef|orf|sr2)$/i.test(filename)) return 'image';
    if (/\.(pdf|djvu)$/i.test(filename)) return 'pdf';
    if (/\.(mp3|wav|wma|aac|flac|ogg|m4a|aiff|alac|amr|ape|au|mpc|tta|wv|opus)$/i.test(filename)) return 'audio';
    if (
      /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpe?g|mpg|m(2|4)v|svi|3gpp2?|mxf|roq|nsv|flv|f4(v|p|a|b))$/i.test(
        filename
      )
    )
      return 'video';
    if (/\.(zip|rar|7z|tar)$/i.test(filename)) return 'zip';
    if (/\.(c(s|pp|)|h|py|tsx?|jsx?|s?css|kt|java|ruby|php|json)$/i.test(filename)) return 'code';
    if (/\.(html|xml|xaml|)$/i.test(filename)) return 'markup';
    return 'text';
  };

  const Glyph = icons[getIcon()];
  return <Glyph className={clsx([className, styles.Icon])} />;
};
