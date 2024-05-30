'use client';
import useCategoriesQuery from '@/hooks/query/useCategoriesQuery';
import type { Option } from '@/types/global';
import mapCategories from '@/utils/mapCategories';
import { createContext, ReactNode } from 'react';

type appContextType = {
  categories: Option[];
  // setCategories: Dispatch<SetStateAction<Option[]>>;
};

const appContextDefaultValues: appContextType = {
  categories: [],
  // setCategories: () => {},
};
export const AppContext = createContext<appContextType>(appContextDefaultValues);

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  const { categories = [] } = useCategoriesQuery();

  const value = {
    categories: mapCategories(categories),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
