import React, {useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {TodolistItem} from "./TodolistItem";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}
export type FilterTaskType = "All" | "Active" | "Completed"

const App = () => {

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: v4(), title: "Todo1", filter: "Completed"},
        {id: v4(), title: "Todo2", filter: "Active"}
    ])

    const [tasks_1, setTasks_1] = useState<TaskType[]>([
        {title: "JS/TS", isDone: false, id: v4()},
        {title: "React", isDone: true, id: v4()},
        {title: "Redux", isDone: true, id: v4()},
        {title: "Svelte", isDone: false, id: v4()},
    ])


    const [error, setError] = useState<string | null>(null)
    const addTask = (onChangeValue: string) => {
        const trimmedTitle = onChangeValue.trim()
        const newTask: TaskType = {title: trimmedTitle, isDone: false, id: v4()}
        if (trimmedTitle.trim()) {
            setTasks_1([newTask, ...tasks_1])
        } else {
            setError("Title is required")
        }
    }

    function onClickFilterHandler(filterValue: FilterTaskType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filterValue
            setTodolists([...todolists])
        }
    }

    const taskStatusHandler = (isDone: boolean, taskId: string) => {
        console.log('change me', taskId)
        setTasks_1(tasks_1.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let filteredTasks = tasks_1
                if (tl.filter === "Active") {
                    filteredTasks = tasks_1.filter((t) => !t.isDone)
                }
                if (tl.filter === "Completed") {
                    filteredTasks = tasks_1.filter((t) => t.isDone)
                }
                return <TodolistItem
                    key={tl.id}
                    title={tl.title}
                    filteredTasks={filteredTasks}
                    setTasks={setTasks_1}
                    addTask={addTask}
                    taskStatusHandler={taskStatusHandler}
                    error={error}
                    setError={setError}
                    filter={tl.filter}
                    onClickFilterHandler={onClickFilterHandler}
                    todoId={tl.id}

                />
            })}

        </div>
    );
}

export default App;