import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import { AuthContext } from "../auth/AuthContext";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useToken();
  const user = useUser();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginToAccount = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await axios.post("http://localhost:8080/auth/login", {
      username: data.get("username"),
      password: data.get("password"),
    });
    const jwt_token = response.data["jwt"];
    console.log("Token: ", jwt_token);
    setToken(jwt_token);
    dispatch({ type: "LOGIN", payload: user });
    navigate("/");
    return <Navigate to={"/"} />;
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in to FoodQuest
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={loginToAccount}
            sx={{ mt: 1 }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              fullWidth
              color="secondary"
              id="username"
              label="Enter Username"
              name="username"
              autoComplete="username"
              sx={{
                color: "white",
              }}
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              color="secondary"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link href="#">{"Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LogInPage;
