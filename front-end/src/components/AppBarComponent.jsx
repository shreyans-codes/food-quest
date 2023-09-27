import AppBar from "@mui/material/AppBar";
import {
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FoodBank } from "@mui/icons-material";

const AppBarComponent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const handleToggle = (event) => {
    setDarkMode(event.target.checked);
  };
  return (
    <div>
      <AppBar position="static">
        <Container
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Toolbar disableGutters>
            <FoodBank sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              FoodSwamp
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleToggle}
                    aria-label="login switch"
                    color="secondary"
                  />
                }
                label={"Dark Mode"}
              />
            </FormGroup>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
