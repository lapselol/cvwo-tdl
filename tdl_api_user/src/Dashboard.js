import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

import { ThemeProvider, makeStyles } from "@mui/styles";
import { createTheme, CssBaseline } from "@mui/material";

import Tasks from "./tasks/tasks";
import Appbar from "./components/appbar";
import Sidebar from "./components/sidebar/Sidebar";
import CalendarView from "./pages/CalendarView";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

export default function Dashboard(props) {
  const { loginStatus, handleLogout } = props;

  const classes = useStyles();

  if (loginStatus === "NOT_LOGGED_IN") {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      <div className={classes.appMain}>
        <Appbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/" element={<Tasks />} />
        </Routes>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}
