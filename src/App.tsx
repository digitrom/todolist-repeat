import React, {useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {TodolistItem} from "./TodolistItem";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type Todolist = {
    id: string
    title: string
    filter: FilterTaskType
}
export type FilterTaskType = "All" | "Active" | "Completed"

const App = () => {

    const todolistId1 = v4()
    const todolistId2 = v4()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: "Todo1", filter: "Completed"},
        {id: todolistId2, title: "Todo2", filter: "Active"}
    ])

    const [tasks_1, setTasks_1] = useState({
        [todolistId1]:[
        {title: "JS/TS", isDone: false, id: v4()},
        {title: "React", isDone: true, id: v4()},
        {title: "Redux", isDone: true, id: v4()},
        {title: "Svelte", isDone: false, id: v4()},
    ],
        [todolistId2]:[
            {title: "Rest API", isDone: false, id: v4()},
            {title: "GraphQL", isDone: false, id: v4()},
            {title: "Express", isDone: false, id: v4()},
        ],
    })


    const [error, setError] = useState<string | null>(null)
    const addTask = (onChangeValue: string, todolistId:string) => {
        const trimmedTitle = onChangeValue.trim()
        const newTask: TaskType = {title: trimmedTitle, isDone: false, id: v4()}
        if (trimmedTitle.trim()) {
            setTasks_1({ ...tasks_1, [todolistId]:[...tasks_1[todolistId], newTask] })
        } else {
            setError("Title is required")
        }
    }

    function onClickFilterHandler(filterValue: FilterTaskType, todolistId: string) {
            setTodolists(todolists.map(tl=>
                 tl.id === todolistId ? { ...tl, filter: filterValue } : tl
            ))
    }

    function deleteAllTasks(todolistId: string) {
        setTasks_1({...tasks_1, [todolistId]: []})
    }

    function deleteTask(todolistId:string, taskId: string) {
        setTasks_1(
            {...tasks_1, [todolistId]: tasks_1[todolistId].filter((t) => t.id !== taskId)})
    }

    const taskStatusHandler = (todolistId:string, isDone: boolean, taskId: string) => {
        setTasks_1({...tasks_1, [todolistId]: tasks_1[todolistId].map((t) => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let filteredTasks = tasks_1
                if (tl.filter === "Active") {
                    filteredTasks = {...tasks_1, [tl.id]: tasks_1[tl.id].filter((t) => !t.isDone)}
                }
                if (tl.filter === "Completed") {
                    filteredTasks = {...tasks_1, [tl.id]: tasks_1[tl.id].filter((t) => t.isDone)}
                }
                return <TodolistItem
                    key={tl.id}
                    filteredTasks={filteredTasks}
                    addTask={addTask}
                    taskStatusHandler={taskStatusHandler}
                    error={error}
                    setError={setError}
                    onClickFilterHandler={onClickFilterHandler}
                    todolist={tl}
                    deleteTask={deleteTask}
                    deleteAllTasks={deleteAllTasks}
                />
            })}

        </div>
    );
}

export default App;