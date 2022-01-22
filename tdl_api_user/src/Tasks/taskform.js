import React , { useEffect } from 'react'
import Controls from '../Components/controls/Controls';
import { useForm, Form } from '../Components/useForm';
import { Grid } from '@mui/material';


const initialFValues = {
    id: 0,
    task: '',
    tag: '',
    deadline: new Date(),
    completed: false
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
        */

        if ('tag' in fieldValues)
            temp.tag = fieldValues.tag ? "" : "This field is required."
        
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
            //console.log("ok")
            addOrEdit(values, resetForm)
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recordForEdit])
    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="task"
                        label="To Do"
                        value={values.task}
                        onChange={handleInputChange}
                        error={errors.task}
                    />

                </Grid>
                <Grid item xs={6}>
                    {
                    <Controls.Input
                        name="tag"
                        label="Tag"
                        value={values.tag}
                        onChange={handleInputChange}
                        error={errors.tag}
                    />
                    /*
                    Dropdown Menu
                    <Controls.Select
                        name="tag"
                        label="Tag"
                        value={values.tag}
                        onChange={handleInputChange}
                        option={taskService.getTagCollection()}
                        error={errors.tagId}
                    />
                    */
                    }
                    <Controls.DatePicker
                        name="deadline"
                        label="Due Date"
                        value={values.deadline}
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