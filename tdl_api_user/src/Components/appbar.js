import React, { useState, useEffect } from 'react'
import { 
    AppBar, 
    Toolbar, 
    Grid, 
    InputBase, 
    IconButton, 
    Badge, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { 
    NotificationsNone, 
    ChatBubbleOutline, 
    PowerSettingsNew, 
    Search 
} from '@mui/icons-material';
import { isOverdue } from '../Services/dateHandler';
import { getAllTasks } from '../Services/taskService';


const useStyles = makeStyles(theme => ({
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Header() {

    const classes = useStyles();
    const [count, setCount] = useState(0)

    const countOverdue = () => {
        let numOverdue = 0
        getAllTasks().then(data => {
        for(var task of data){
            if(isOverdue(task.deadline)){
                numOverdue += 1;
            }
        }
        setCount(numOverdue)
    })};
    
    useEffect(() => {
        countOverdue()
    }, [])

    return (
        <AppBar position="static" color="transparent">
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={count} color="error">
                                <NotificationsNone fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutline fontSize="small" />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <PowerSettingsNew fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}