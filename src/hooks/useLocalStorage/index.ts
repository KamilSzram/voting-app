import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (valueToSave: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const saveValue = (valueToSave: T) => {
    setValue(valueToSave);
    window.localStorage.setItem(key, JSON.stringify(valueToSave));
  };

  return [value, saveValue];
}

export default useLocalStorage;
