import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                disableToolbar variant="inline" 
                inputVariant="outlined"
                disablePast = "true"
                minDateMessage = "Please choose a date in the future"
                label={label}
                format="yyyy/MM/dd"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
            />
        </MuiPickersUtilsProvider>
    )
}