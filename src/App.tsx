import React, {useState} from 'react';
import './App.css';
import {TodolistItem} from "./TodolistItem";


export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

const App = () => {

    const[tasks_1, setTasks_1] = useState<TaskType[]>([
        {title: "JS/TS", isDone: false, id: 1},
        {title: "React", isDone: true, id: 2},
        {title: "Redux", isDone: true, id: 3},
        {title: "Svelte", isDone: false, id: 4},
    ])

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
