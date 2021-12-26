import React from "react";
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography } from "@mui/material";

const useStyles = makeStyles({
    root: {
        height: "auto",
        margin: "1em",
        padding: "2em"
    },
    paper: {
        margin: "1em",
        padding: "2em",
        textAlign: "justify"
    },
    heading: {
        textAlign: "left"
    },
    todo_body: {
        padding: "1em"
    }
})

export default function TodoItem(props){
    const classes = useStyles();
    function handleDelete(){
        console.log("click")
        props.deleteItem(props.item)
    }
    return (
        <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <Paper elevation={10} className={classes.paper}>
                    <Typography variant="h4" className={classes.heading}>
                        {props.item.task}
                    </Typography>
                    <hr />
                    <div className={classes.todo_body}>
                        <Typography variant="body1">
                            {props.item.body}
                        </Typography>
                    </div>
                    <hr/>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}