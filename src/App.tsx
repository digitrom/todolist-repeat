import React, {useState} from 'react';
import './App.css';
import {TodolistItem} from "./TodolistItem";
import {v4} from "uuid";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

const App = () => {

    const[tasks_1, setTasks_1] = useState<TaskType[]>([
        {title: "JS/TS", isDone: false, id: v4()},
        {title: "React", isDone: true, id: v4()},
        {title: "Redux", isDone: true, id: v4()},
        {title: "Svelte", isDone: false, id: v4()},
    ])

    const [error, setError] = useState<string | null>(null)
    const addTask = (onChangeValue:string) => {
        const newTask:TaskType = {title: onChangeValue, isDone: false, id: v4()}
        if (onChangeValue.trim()) {
            setTasks_1([newTask, ...tasks_1])
        } else {
            setError("Title is required")
        }
    }

    const taskStatusHandler = (isDone:boolean, taskId:string ) => {
        console.log('change me', taskId)
      setTasks_1(tasks_1.map((t)=> t.id === taskId ? {...t, isDone: isDone}: t))
 }


    const todolist_title_1: string = "What to learn"

    return (
        <div className="App">
            <TodolistItem title={todolist_title_1}
                          tasks={tasks_1}
                          setTasks={setTasks_1}
                          date={"5.04.2025"}
                          addTask={addTask}
                          taskStatusHandler={taskStatusHandler}
                          error={error}
                          setError={setError}
            />
        </div>
    );
}

export default App;