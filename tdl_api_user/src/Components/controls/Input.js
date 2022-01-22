import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const { id, name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            id={id}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}