export let initialState = {
  isLoggedIn: false,
  //   user: { capabilities: [] },
  token: "",
  userInfo: { role: "" },
  error: null,
  authorization: [],
};

export function loginReducer(state, action) {
  switch (action.type) {
    case "ON_LOGIN": {
      return {
        ...state,
        isLoggedIn: true,
        ...action.payload.userInfo,
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
