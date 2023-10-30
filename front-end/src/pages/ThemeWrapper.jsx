import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import RouterInterface from "../RouterInterface";
import { Provider } from "react-redux";
import store from "../redux/store";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {console.log(store.getState())}
          <RouterInterface />
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
