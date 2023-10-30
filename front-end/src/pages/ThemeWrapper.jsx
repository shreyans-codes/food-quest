
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


  return (
    <ColorModeContext.Provider value={colorMode}>
        <Provider store={store}>
          {console.log(store.getState())}
          <RouterInterface />
        </Provider>
    </ColorModeContext.Provider>
  );
}
