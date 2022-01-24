import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axios from "axios";

import Home from "./Home";
import Dashboard from "./Dashboard";
import Registration from "./components/authentication/Registration";

export default function App() {
  const [loginStatus, setLoginStatus] = useState("LOGGED_IN");
  const [user, setUser] = useState({});

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loginStatus === "NOT_LOGGED_IN") {
          setLoginStatus("LOGGED_IN");
          setUser(response.data.user);
        } else if (!response.data.logged_in && loginStatus === "LOGGED_IN") {
          setLoginStatus("NOT_LOGGED_IN");
          setUser({});
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setLoginStatus("NOT_LOGGED_IN");
    setUser({});
  };

  const handleLogin = (data) => {
    setLoginStatus("LOGGED_IN");
    setUser(data.user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home handleLogin={handleLogin} />} />
        <Route
          path="/dashboard/*"
          element={
            <Dashboard loginStatus={loginStatus} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/register"
          element={<Registration handleLogin={handleLogin} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
