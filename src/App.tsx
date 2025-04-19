import React, {useState} from 'react';
import './App.css';
import {TodolistItem} from "./TodolistItem";
import {v1} from "uuid";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

const App = () => {

    const[tasks_1, setTasks_1] = useState<TaskType[]>([
        {title: "JS/TS", isDone: false, id: v1()},
        {title: "React", isDone: true, id: v1()},
        {title: "Redux", isDone: true, id: v1()},
        {title: "Svelte", isDone: false, id: v1()},
    ])
    const addTask = () => {
        const newTask = {title: "rrtt", isDone: false, id: 6}
    }

    const todolist_title_1: string = "What to learn"
    const todolist_title_2: string = "What to buy"

    return (
        <div className="App">
            <TodolistItem title={todolist_title_1}
                          tasks={tasks_1}
                          setTasks={setTasks_1}
                          date={"5.04.2025"}/>
        </div>
    );
}

export default App;
