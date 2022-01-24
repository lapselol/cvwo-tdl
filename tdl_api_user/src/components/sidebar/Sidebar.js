import React from "react";

import "./Sidebar.css";
import SidebarData from "./SidebarData";

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.route ? "active" : ""}
              onClick={() => (window.location.pathname = val.route)}
            >
              {" "}
              <div id="icon">{val.icon}</div> <div id="name">{val.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
