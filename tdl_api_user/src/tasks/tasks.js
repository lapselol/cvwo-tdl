import React, { useState } from 'react'
import TaskForm from "./taskform";
import PageHeader from "../components/pageheader"
import * as taskService from "../services/taskService"
import { 
    Paper, 
    TableBody, 
    TableRow, 
    TableCell, 
    Toolbar, 
    InputAdornment, 
    IconButton
} from '@mui/material';
import Popup from "../components/popup";
import useTable from "../components/useTable";
import Controls from '../components/controls/Controls';
import { 
    PeopleOutlineTwoTone, 
    Search, 
    EditOutlined, 
    Close,
    Add 
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Notification from '../components/notification';
import ConfirmDialog from '../components/ConfirmDialog';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
}))

const headCells = [
    { id: 'task', label: 'To Do' },
    { id: 'tag', label: 'Tag'}, 
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Tasks() {

    const classes = useStyles();
    const [records, setRecords] = useState(taskService.getAllTasks())
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.task.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (task, resetForm) => {
        if (task.id === 0)
            taskService.insertTask(task)
        else
            taskService.updateTask(task)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(taskService.getAllTasks())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        taskService.deleteTask(id);
        setRecords(taskService.getAllTasks())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            <PageHeader
                title="New Task"
                subTitle="tasks"
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Tasks"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<Add />}
                        sx={{ zIndex: 'right' }}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.task}</TableCell>
                                    <TableCell>{item.tag}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlined fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            sx={{bgcolor: 'background.paper'}}
                                            color="error"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure you want to delete this task?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <Close fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Task Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <TaskForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}