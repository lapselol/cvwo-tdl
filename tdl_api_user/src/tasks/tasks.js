import React, { useState, useEffect, useCallback } from "react";

import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { Search, EditOutlined, Close, Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import Popup from "../components/popup";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import * as taskService from "../services/taskService";
import * as dateHandler from "../services/dateHandler";
import TaskForm from "./taskform";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "flex",
    left:"180px",
  }
}));

const headCells = [
  { id: "checkbox", label: "", disableSorting: true },
  { id: "task", label: "To Do" },
  { id: "tag", label: "Tag" },
  { id: "deadline", label: "Due Date" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export default function Tasks() {
  const classes = useStyles();

  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.task.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleCheckbox = async (task) => {
    taskService.completedTask(task, !task.completed).then(onRefresh());
    let data = await taskService.getAllTasks();
    setRecords(data);
    setNotify({
      isOpen: true,
      message: !task.completed ? "Marked Completed" : "Marked Uncompleted",
      type: !task.completed ? "success" : "error",
    });
  };

  const addOrEdit = async (task, resetForm) => {
    if (task.id === 0) taskService.insertTask(task).then(onRefresh());
    else taskService.updateTask(task).then(onRefresh());
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    let data = await taskService.getAllTasks();
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = async (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    taskService.deleteTask(item.id).then(onRefresh());
    let data = await taskService.getAllTasks();
    setRecords(data);
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  const refresh = () => {
    taskService.getAllTasks().then((json) => {
      setRecords(json);
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let data = await taskService.getAllTasks();
    setRecords(data);
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Tasks"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add New"
            variant="outlined"
            className={classes.newButton}
            startIcon={<Add />}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow
                key={item.id}
                style={
                  item.completed
                    ? { background: "#68b36b" }
                    : dateHandler.isOverdue(item.deadline)
                    ? { background: "#ef9a9a" }
                    : { background: "white" }
                }
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={item.completed}
                    onChange={() => {
                      handleCheckbox(item);
                    }}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: 15 }}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.task}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 15 }}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.tag}
                </TableCell>
                <TableCell
                  sx={{ fontSize: 15 }}
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                >
                  {item.deadline}
                </TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    sx={{ bgcolor: "background.paper" }}
                    color="error"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure you want to delete this task?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item);
                        },
                      });
                    }}
                  >
                    <Close fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title={recordForEdit == null ? "Add a new todo!" : "Editing todo"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TaskForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
