import { useEffect, useRef } from "react";

const useDebounce = (callback, delay) => {
  const timeoutId = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  const debouncedCallBack = (...args) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallBack;
};

export { useDebounce };
