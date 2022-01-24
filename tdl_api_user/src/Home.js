import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "./components/authentication/Login";
import "./Home.css";

export default function Home(props) {
  const { handleLogin } = props;

  let navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    handleLogin(data);
    navigate("/dashboard");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <Login
        handleSuccessfulAuth={handleSuccessfulAuth}
        handleMouseDownPassword={handleMouseDownPassword}
      />
    </div>
  );
}
