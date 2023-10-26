import { getUserFromToken } from "./useUser";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: [...getUserFromToken(action.payload), {isEnabled: true}],
      };
    }
    case "LOGIN-VERIFY": {
      return {
        currentUser: [...getUserFromToken(action.payload), {isEnabled: false}],
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("token");
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
