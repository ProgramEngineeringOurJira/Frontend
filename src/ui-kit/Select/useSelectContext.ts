import { useContext } from 'react';
import { SelectContext } from './selectContext';

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Error in creating the context');
  }
  return context;
};
