import React, { useEffect } from "react";
import cookie from "react-cookies";
import AxiosHit from "src/utils/api/AxiosHit";
import { initialState, loginReducer } from "../reducers/loginReducer";
import { useCookie } from "../useLocalStorage";
import axios from "axios";

export const LoginContext = React.createContext();
function LoginProvider(props) {
  const [loginData, loginDispatch] = useCookie("userInfo", initialState);
  // function can(capability) {
  //   return loginData.user.capabilities?.includes(capability) && loginData.token;
  // }
  async function login(loginData, setAlertInfo) {
    let hitResult = await AxiosHit({
      method: "post",
      url: "users/signin",
      data: {
        email: loginData.email,
        password: loginData.password,
      },
    });
    console.log(hitResult);
    // loginDispatch({ type: "ON_LOGIN", payload: hitResult });
    // console.log(hitResult);
    // axios.defaults.headers.common["authorization"] = hitResult.authorization;
    // setAlertInfo({
    //   alertType: hitResult.result,
    //   alertMsg: hitResult.description,
    //   redirectTo: hitResult.redirectTo,
    // });
  }
  function logout() {
    cookie.remove("userInfo");
    delete axios.defaults.headers.common["authorization"];
    loginDispatch("ON_LOGOUT");
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
    console.log(userInfo);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        // can,
        login,
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
