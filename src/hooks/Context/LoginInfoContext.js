import React, { useEffect } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { initialState } from "../reducers/loginReducer";
import cookie from "react-cookies";

export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useLocalStorage("userInfo", initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }

  function logout() {
    console.log("loged out ");
    // setLoginState(false, null, {});
  }

  // function setLoginState(loggedIn, token, user, error) {
  //   cookie.save("auth", token);
  //   loginDispatch({ type: "CHANGE_LOGIN_STATUS", payload: loggedIn });
  //   loginDispatch({ type: "CHANGE_TOKEN", payload: token });
  //   loginDispatch({ type: "CHANGE_USER", payload: user });
  //   // dispatch({ type: 'CHANGE_ERROR', payload: error });
  // }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("userInfo");
    const userInfo = qs.get("userInfo") || cookieToken || initialState;
    // validateToken(token);
    console.log(userInfo);
    // loginDispatch({
    //   type: "ON_LOGIN",
    //   payload: { userInfo: userInfo.userInfo, token: userInfo.token },
    // });
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
