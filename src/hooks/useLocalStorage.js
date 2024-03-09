import { useEffect, useState } from "react";

export const useLocalStorage = (storageKey, defaultValue) => {
  const [localValue, setLocalValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? defaultValue
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(localValue));
  }, [localValue, storageKey]);

  return [localValue, setLocalValue];
};
