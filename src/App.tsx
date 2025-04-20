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
    const addTask = (onChangeValue:string) => {
        const newTask:TaskType = {title: onChangeValue, isDone: false, id: v4()}
        if (onChangeValue.trim()) {
            setTasks_1([newTask, ...tasks_1])
        }
    }

    const todolist_title_1: string = "What to learn"
    const todolist_title_2: string = "What to buy"

    return (
        <div className="App">
            <TodolistItem title={todolist_title_1}
                          tasks={tasks_1}
                          setTasks={setTasks_1}
                          date={"5.04.2025"}
                          addTask={addTask}
            />
        </div>
    );
}

export default App;