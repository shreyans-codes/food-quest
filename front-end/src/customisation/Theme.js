import { createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#2EFF22",
    },
    secondary: { main: "#22BF19" },
    grey: { main: "#22BF19" },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "#2EFF22",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#2EFF22",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#2EFF22",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#2EFF22",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#2EFF22",
        },
      },
    },
  },
});

export default Theme;
