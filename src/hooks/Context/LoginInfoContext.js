import React, { useEffect, useReducer } from "react";
import cookie from "react-cookies";
import { initialState, loginReducer } from "../reducers/loginReducer";
export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useReducer(loginReducer, initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }
  useEffect(() => {
    console.log(loginData);
  }, [loginData]);
  function logout() {
    console.log("loged out ");
    setLoginState(false, null, {});
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save("auth", token);
    dispatch({ type: "CHANGE_LOGIN_STATUS", payload: loggedIn });
    dispatch({ type: "CHANGE_TOKEN", payload: token });
    dispatch({ type: "CHANGE_USER", payload: user });
    // dispatch({ type: 'CHANGE_ERROR', payload: error });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    // validateToken(token);
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("log");
  // }, [loginData.isLoggedIn]);

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
