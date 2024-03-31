export let initialState = {
  isLoggedIn: false,
  //   user: { capabilities: [] },
  token: "",
  userInfo: {},
  error: null,
  authorization: [],
};

export function loginReducer(state, action) {
  switch (action.type) {
    case "ON_LOGIN": {
      console.log("called".repeat(20));
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload.userInfo,
        authorization: action.payload.authorization,
      };
    }
    case "ON_SIGNOUT":
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
