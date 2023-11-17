import axios from "axios";
import BASE_URL from "../variables/base_url";

export const registerUser = async (userData) => {
  const response = await axios.post(BASE_URL + "/auth/register", {
    email: userData.email,
    username: userData.username,
    password: userData.password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    mfaEnabled: userData.mfaEnableRef,
  });
  console.log("Response from registration: ", response);
  if (response.status < 300) {
    document.getElementById("my_modal").showModal();
  }
  return [response, userData.mfaEnabled];
};

export const loginToAccount = async (userData) => {
  const response = await axios.post(BASE_URL + "/auth/login", {
    username: userData.username,
    password: userData.password,
  });
  const jwt_token = response.data["jwt"];
  console.log("Token: ", jwt_token);
  let mfaEnabled = false;
  if (jwt_token === "") mfaEnabled = true;
  else localStorage.setItem("token", jwt_token);
  return [response.data, mfaEnabled];
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const verifyCode = async (userData, code) => {
  const response = await axios.post(BASE_URL + "/auth/verify", {
    username: userData.username,
    password: userData.password,
    code: code,
  });
  const jwt_token = response.data["jwt"];
  console.log("Token: ", jwt_token);
  localStorage.setItem("token", jwt_token);
};
