const KEYS = {
    tasks: 'tasks',
    taskId: 'taskId'
}

export const getTagCollection = () => ([
    { id: '1', title: 'CS1234' },
    { id: '2', title: 'CS1235' },
    { id: '3', title: 'CS1236' },
    { id: '4', title: 'CS1238' },
])

export function insertTask(data) {
    let tasks = getAllTasks();
    data['id'] = generateTaskId()
    tasks.push(data)
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks))
}

export function updateTask(data) {
    let tasks = getAllTasks();
    let recordIndex = tasks.findIndex(x => x.id === data.id);
    tasks[recordIndex] = { ...data }
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function deleteTask(id) {
    let tasks = getAllTasks();
    tasks = tasks.filter(x => x.id !== id)
    localStorage.setItem(KEYS.tasks, JSON.stringify(tasks));
}

export function generateTaskId() {
    if (localStorage.getItem(KEYS.taskId) === null)
        localStorage.setItem(KEYS.taskId, '0')
    var id = parseInt(localStorage.getItem(KEYS.taskId))
    localStorage.setItem(KEYS.taskId, (++id).toString())
    return id;
}

export function getAllTasks() {
    if (localStorage.getItem(KEYS.tasks) === null)
        localStorage.setItem(KEYS.tasks, JSON.stringify([]))
    let tasks = JSON.parse(localStorage.getItem(KEYS.tasks));
    //map tagID to tag title
    let tags = getTagCollection();
    return tasks.map(x => ({
        ...x,
        tag: tags[x.tagId - 1].title
    }))
}