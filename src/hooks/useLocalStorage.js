import { useEffect, useReducer } from "react";
import { loginReducer } from "./reducers/loginReducer";

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useReducer(
    loginReducer,
    getStorageValue(key, defaultValue)
  );

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
