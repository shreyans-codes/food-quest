import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideImageComponent from "../components/SideImageComponent";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const signUpToAccount = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:8080/auth/register", {
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    console.log("Response from registration: ", response.body);
    if (response.status === 200) {
      document.getElementById("my_modal").showModal();
      navigate("/login");
    }
    // document.getElementById("my_modal").showModal();
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="grid" style={{ gridTemplateColumns: "7fr 5fr" }}>
        <SideImageComponent />
        <div className="form-control w-full max-w-lg m-auto mt-10">
          <article className="prose">
            <h1>SignUp to Food Quest</h1>
          </article>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
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
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <button className="btn btn-info mt-10" onClick={signUpToAccount}>
            SignUp
          </button>
          <span className="mx-auto mt-2">
            Already have an account?{" "}
            <a className="link-primary" href="/login">
              Log In
            </a>
          </span>
          <dialog id="my_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Account Created!</h3>
              <p className="py-4">Please log in using the new account</p>
              <p>Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
