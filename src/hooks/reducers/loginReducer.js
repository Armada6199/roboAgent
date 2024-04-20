import cookie from "react-cookies";
export let initialState = {
  isLoggedIn: false,
  token: "",
};
export function loginReducer(state, action) {
  switch (action.type) {
    case "ON_LOGIN": {
      cookie.save("userInfo", {
        ...state,
        isLoggedIn: true,
        ...action.payload.data.user,
        token: action.payload.authorization,
      });

      return {
        ...state,
        isLoggedIn: true,
        ...action.payload.data.user,
        token: action.payload.authorization,
      };
    }
    case "ON_LOGOUT":
      console.log("logged out");
      return {
        ...initialState,
      };
    case "CHANGE_USER":
      return { ...state, userInfo: action.payload };
    case "CHANGE_TOKEN":
      return { ...state, token: action.payload };
    // case 'CHANGE_ERROR':return {...state,token:action.payload};
    default:
      return state;
  }
}
