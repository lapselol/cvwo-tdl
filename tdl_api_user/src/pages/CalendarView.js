import React, { useState, useEffect, useCallback } from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";

import Notification from "../components/Notification";
import Popup from "../components/popup";
import * as taskService from "../services/taskService";
import * as dateHandler from "../services/dateHandler";
import TaskForm from "../tasks/taskform";
import "./CalendarView.css";

export default function CalendarView() {

  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [openPopup, setOpenPopup] = useState(false);

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

  const refresh = () => {
    taskService
      .getAllTasks()
      .then((json) => {
        setRecords(json);
      });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let data = await taskService.getAllTasks();
    setRecords(data);
    setRefreshing(false);
    console.log("Refresh state", refreshing);
  }, [refreshing]);

  useEffect(() => {
    refresh();
  }, [onRefresh]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        aspectRatio="2.5"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "today",
        }}
        events={records.map((item) => {
          return {
            id: item.id,
            title: item.task,
            start: item.deadline,
            color: item.completed
              ? "#68b36b"
              : dateHandler.isOverdue(item.deadline)
              ? "#ef9a9a"
              : "",
          };
        })}
        eventClick={function (info) {
          let eventToItem = records.find((item) => item.id == info.event.id)
          openInPopup(eventToItem)
        }}
        editable={true}
        eventDrop={function (info) {
          let eventToItem = records.find((item) => item.id == info.event.id)
          taskService.calendarDrop(eventToItem, info.event.start)
          onRefresh()
        }}
        dateClick={function (info) {
          const temp_obj = {
            id: 0,
            task: "",
            tag: "",
            deadline: info.dateStr,
            completed: false,
          };
          openInPopup(temp_obj);
        }}
      />
      <Popup
        title={recordForEdit == null ? "Add a new todo!" : "Editing todo"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TaskForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
