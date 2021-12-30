import React , { useEffect } from 'react'
import Controls from '../components/controls/Controls';
import { useForm, Form } from '../components/useform';
import { Grid } from '@mui/material';
import * as taskService from "../services/taskService"


const initialFValues = {
    id: 0,
    task: '',
    tagId: '',
    dueDate: new Date(),
}

export default function TaskForm(props) {

    const {addOrEdit, recordForEdit} = props

    const validate = (fieldValues = values) => {
        //validation error messages
        let temp = { ...errors }
        if ('task' in fieldValues)
            temp.task = fieldValues.task ? "" : "This field is required."
        /*
        if email needed in future
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
    
        if numbers needed in future
        if ('num' in fieldValues)
        temp.num = fieldValues.num.length > 99 ? "" : "Minimum 100 numbers required."
        
        tag not compulsory
        if ('tagId' in fieldValues)
            temp.tagId = fieldValues.tagId.length !== 0 ? "" : "This field is required."
        */
        setErrors({
            ...temp
        })
        
        //allows validate function to return a bool
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log("ok")
            addOrEdit(values, resetForm)
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, setValues])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="task"
                        label="To Do"
                        defaultValue={values.task}
                        onChange={handleInputChange}
                        error={errors.task}
                    />

                </Grid>
                <Grid item xs={6}>
                    {
                    <Controls.Select
                        name="tagId"
                        label="Tag"
                        value={values.tagId}
                        onChange={handleInputChange}
                        option={taskService.getTagCollection()}
                        error={errors.tagId}
                    />
                    }
                    <Controls.DatePicker
                        name="dueDate"
                        label="Due Date"
                        value={values.dueDate}
                        onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                        //type can be accessed through "...other" in button.js
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="inherit"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}