const apiURL = 'http://localhost:3000/api/v1/todos'

export function getAllTasks(){
    return fetch(apiURL)
            .then((res) => res.json());
}
export function getTask(id){
    return fetch(`${apiURL}/${id}`)
            .then((res) => res.json());
}

export function insertTask(Task){
    return fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: Task.task,
            tag: Task.tag,
            deadline: Task.deadline
        })
    }).then((res) => res.json())
}

export function updateTask(Task){
    return fetch(`${apiURL}/${Task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: Task.id,
            task: Task.task,
            deadline: Task.deadline,
            tag: Task.tag
        })
    }).then((res) => res.json())
}

export function deleteTask(id){
    return fetch(`${apiURL}/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}

export function completedTask(Task, isChecked){
    return fetch(`${apiURL}/${Task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            completed: isChecked
        })
    }).then((res) => res.json())
}

export function calendarDrop(Task, newDate){
    console.log(newDate)
    let dateObj = new Date(newDate);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let date = dateObj.getDate();

    let paddedMonth = month.toString();
    if (paddedMonth.length < 2){
      paddedMonth = "0" + paddedMonth;
    }

    let paddedDate = date.toString();
    if (paddedDate.length < 2){
      paddedDate = "0" + paddedDate;
    }

    let toStoreDate = `${year}-${paddedMonth}-${paddedDate}`;

    return fetch(`${apiURL}/${Task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            deadline: toStoreDate,
        })
    }).then((res) => res.json())
}