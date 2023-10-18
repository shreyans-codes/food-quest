const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
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
