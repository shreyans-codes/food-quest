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
import SideImageComponent from "../components/SideImageComponent";

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
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="grid" style={{ gridTemplateColumns: "7fr 5fr" }}>
        <SideImageComponent />
        <div className="form-control w-full max-w-lg m-auto mt-10">
          <article className="prose">
            <h1>Log in to your account</h1>
          </article>
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <button className="btn btn-info mt-10" onClick={loginToAccount}>
            Log In
          </button>
          {/* 
           // TODO: Have a Forgot Password button 
          */}
          <span className="mx-auto mt-2">
            Don't have an account?{" "}
            <a className="link-primary" href="/signup">
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
