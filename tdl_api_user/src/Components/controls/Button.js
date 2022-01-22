import React from 'react'
import { Button as MuiButton } from "@mui/material";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5)
    }
}))

export default function Button(props) {

    //"...other" to account for extra properties
    const { text, size, color, variant, onClick, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            // types after || is defined as default value
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: classes.root}}>
            {text}
        </MuiButton>
    )
}