import { useEffect, useReducer } from "react";
import cookie from "react-cookies";
import { loginReducer } from "./reducers/loginReducer";

function cookieValue(key, defaultValue) {
  const qs = new URLSearchParams(window.location.search);
  const cookieToken = cookie.load(key);
  const userInfo = qs.get(key) || cookieToken || defaultValue;
  return userInfo;
}

export const useCookie = (key, defaultValue) => {
  const [value, dispatchLogin] = useReducer(
    loginReducer,
    cookieValue(key, defaultValue)
  );

  useEffect(() => {
    // storing input name
    // cookie.save(key, value);
    if (cookie.load("userInfo")) {
      dispatchLogin({ action: "ON_LOGIN", payload: cookie.load() });
    }
  }, [key, value]);

  return [value, dispatchLogin];
};
