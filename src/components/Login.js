import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userservice from "../services/userservice";
import { getUserDetails } from "../utils/getUserDetails";
import "../css/Login.css";

const Login = () => {
  const [isShowErrorLabel, setIsShowErrorLabel] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("app-token") !== null) {
      const expireDate = new Date(getUserDetails().exp * 1000);
      const now = new Date();
      if (expireDate.getTime() > now.getTime()) {
        navigate("/patients");
      }
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    userservice
      .login({ username: email, password: password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("app-token", token);
        setIsShowErrorLabel(false);
        navigate("/patients");
      })
      .catch((err) => {
        console.log("Error when logging in", err);
        setIsShowErrorLabel(true);
      });
  };

  return (
    <div className="componentContainer">
      <div className="pt-2 border formContainer ml-3 mr-3">
        <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={
              isShowErrorLabel
                ? { color: "red", marginTop: "-4px" }
                : { visibility: "hidden", marginTop: "-4px" }
            }
          >
            <p>Invalid credentials, please try again!</p>
          </div>

          <div className="centerDiv" style={{ marginTop: "-8px" }}>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
