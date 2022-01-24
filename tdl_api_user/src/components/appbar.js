import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import { Logout, NotificationsNone } from "@mui/icons-material";

import { isOverdue } from "../services/dateHandler";
import { getAllTasks } from "../services/taskService";
import { Button } from "@mui/material";

export default function Appbar(props) {
  const { handleLogout } = props;
  const [count, setCount] = useState(0);

  const countOverdue = () => {
    let numOverdue = 0;
    getAllTasks().then((data) => {
      for (var task of data) {
        if (isOverdue(task.deadline) && !task.completed) {
          numOverdue += 1;
        }
      }
      setCount(numOverdue);
    });
  };

  useEffect(() => {
    countOverdue();
  }, []);

  const handleLogoutClick = () => {
    console.log("Clicked Logout");
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        handleLogout();
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item sm></Grid>
          <Grid item>
            <Tooltip title="You have overdue items" arrow>
              <IconButton>
                <Badge badgeContent={count} color="error">
                  <NotificationsNone fontSize="medium" />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton disableRipple="true"></IconButton>
            <Button
              variant="contained"
              startIcon={<Logout />}
              onClick={() => {
                handleLogoutClick();
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
