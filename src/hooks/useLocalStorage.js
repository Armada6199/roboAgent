import { useEffect, useReducer } from "react";
import { loginReducer } from "./reducers/loginReducer";

function getStorageValue(key, defaultValue) {
  // getting stored value
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
    localStorage.setItem(key, JSON.stringify(value));
    console.log(value);
  }, [key, value]);

  return [value, setValue];
};
