import React from "react";
import { Event, List } from '@mui/icons-material';

const SidebarData = [
    {
        name: "To Do List",
        route: '/dashboard/',
        icon: <List />
    },
    {
        name: "Calendar View",
        route: '/dashboard/calendar',
        icon: <Event />
    },
];

export default SidebarData;