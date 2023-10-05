import React, { useContext } from "react";
import { AuthContext, AuthContextProvider } from "./auth/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useTheme } from "@mui/material";
import LogInPage from "./pages/LoginPage";

const Home = () => {
  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const currentUser = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    console.log(currentUser);
    if (currentUser.currentUser === null) {
      console.log("Here with null");
      return <Navigate to={"/login"} />;
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default Home;
