import React, { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./auth/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter, useNavigate } from "react-router-dom";
import App from "./App";
import LogInPage from "./pages/LogInPage";
import SignUp from "./pages/SignUp";
import VerifyPage from "./pages/VerifyPage";
import { useSelector } from "react-redux";

const RouterInterface = () => {
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const colorMode = React.useContext(ColorModeContext);
  // ? Can't use navigate here
  // const navigate = useNavigate();

  const { user } = useSelector((state) => state.authActions);
  const RequireAuth = ({ children }) => {
    console.log("User: ", user)
    if (user === null) {
      return <Navigate to={"/login"} />
    } else {
      return children;
    }
  };
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<LogInPage />} />
              <Route
                index
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              />
              <Route path="signup" element={<SignUp />} />
              <Route path="verify" element={<VerifyPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default RouterInterface;
