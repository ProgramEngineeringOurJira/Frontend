import React, { ReactNode, useState, useRef } from 'react';
import clsx from 'clsx';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import { SelectContext } from './selectContext';

import styles from './styles.module.scss';

export const Select: React.FC<{
  children: ReactNode | ReactNode[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}> = ({ children, defaultValue, placeholder, className }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || 'Sprint';
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return (
    <SelectContext.Provider value={{ selectedOption, changeSelectedOption: updateSelectedOption }}>
      <div className={clsx(styles.Select__container, className)} ref={selectContainerRef}>
        <div className={styles.Select__text} onClick={showDropdownHandler}>
          {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
        </div>
        <ul
          className={
            showDropdown
              ? clsx(styles.Select__options, styles['Select__options-dropdown_show'])
              : clsx(styles.Select__options, styles['Select__options-dropdown_hide'])
          }
        >
          {children}
        </ul>
      </div>
    </SelectContext.Provider>
  );
};
