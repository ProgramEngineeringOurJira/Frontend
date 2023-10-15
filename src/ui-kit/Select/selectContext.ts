import { createContext } from 'react';

export const SelectContext = createContext<{
  selectedOption: string;
  changeSelectedOption: (option: string) => void;
}>({
  selectedOption: '',
  changeSelectedOption: (option: string) => {}
});
