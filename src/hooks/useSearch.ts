import { useState, useEffect, useMemo } from 'react';
import { FormData } from '../types';

interface UseSearchProps {
  data: FormData[];
  searchFields: (keyof FormData)[];
}

export const useSearch = ({ data, searchFields }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<FormData[]>(data);

  const exactMatch = (fieldValue: any, searchValue: string): boolean => {
    if (Array.isArray(fieldValue)) {
      return fieldValue.some(
        (value) => value.toLowerCase() === searchValue.toLowerCase()
      );
    }
    const stringValue = String(fieldValue).toLowerCase();
    const searchLower = searchValue.toLowerCase();

    if (
      fieldValue &&
      typeof fieldValue === 'string' &&
      (fieldValue.includes(' ') || searchValue.includes(' '))
    ) {
      return stringValue === searchLower;
    }

    return stringValue === searchLower;
  };

  const searchFunction = useMemo(
    () => (item: FormData, term: string) => {
      if (!term.trim()) {
        return true;
      }

      return searchFields.some((field) => {
        const value = item[field];
        return exactMatch(value, term);
      });
    },
    [searchFields]
  );

  useEffect(() => {
    const filtered = data.filter((item) => searchFunction(item, searchTerm));
    setFilteredData(filtered);
  }, [data, searchTerm, searchFunction]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};
