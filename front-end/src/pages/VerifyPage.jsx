import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import { AuthContext } from "../auth/AuthContext";

const VerifyPage = () => {
  const location = useLocation();
  const recievedData = location.state;
  const [token, setToken] = useToken();
  const [code, setCode] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(recievedData.username);
  const verifyMFACode = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:8080/auth/verify", {
      username: recievedData.username,
      password: recievedData.password,
      code: code,
    });
    if (response.status === 200) {
      const jwt_token = response.data["jwt"];
      setToken(jwt_token);
      dispatch({ type: "LOGIN", payload: jwt_token });
      navigate("/");
    }
  };
  return (
    <div className="w-max m-auto mt-20">
      {recievedData.secretImage && (
        <img src={recievedData.secretImage} alt="QR Code" />
      )}
      <div className="form-control w-full m-auto max-w-xs">
        <label className="label">
          <span className="label-text">Enter current OTP Code</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label className="label"></label>
        <button className="btn btn-info" onClick={verifyMFACode}>
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
