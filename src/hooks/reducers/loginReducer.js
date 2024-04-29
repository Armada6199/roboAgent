export let initialState = {
  isLoggedIn: false,
  token: null,
};
export function loginReducer(state, action) {
  switch (action.type) {
    case "ON_LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload.user,
        token: action.payload.token,
      };
    }
    case "ON_LOGOUT":
      localStorage.removeItem("userInfo");
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
