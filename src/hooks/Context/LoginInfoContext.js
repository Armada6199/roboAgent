import React, { useEffect } from "react";
import cookie from "react-cookies";
import { initialState } from "../reducers/loginReducer";
import { useCookie } from "../useLocalStorage";
import axios from "axios";

export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useCookie("userInfo", initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }

  function logout() {
    console.log("loged out ");
    cookie.remove("userInfo");
    // delete axios.defaults.headers.common["authorization"];
    loginDispatch("ON_LOGOUT");
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save("auth", token);
    loginDispatch({ type: "CHANGE_LOGIN_STATUS", payload: loggedIn });
    loginDispatch({ type: "CHANGE_TOKEN", payload: token });
    loginDispatch({ type: "CHANGE_USER", payload: user });
    // dispatch({ type: 'CHANGE_ERROR', payload: error });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("userInfo");
    const userInfo = qs.get("userInfo") || cookieToken || initialState;
    console.log(userInfo);
    loginDispatch;
  }, []);

  return (
    <LoginContext.Provider
      value={{
        // can,
        logout,
        loginDispatch,
        loginData,
        loginDispatch,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
