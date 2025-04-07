import React from 'react';
import './App.css';
import {TodolistItem} from "./TodolistItem";

const tasks_1: TaskType[] = [
    {title: "JS/TS", isDone: false, id: 1},
    {title: "React", isDone: true, id: 2},
    {title: "Redux", isDone: true, id: 3},
    {title: "Svelte", isDone: false, id: 4},
]
const tasks_2: TaskType[] = [
    // {title: "Fish", isDone: false, id: 1},
    // {title: "Mango", isDone: true, id: 2},
    // {title: "Milk ", isDone: true, id: 3},
    // {title: "Coconut ", isDone: true, id: 4},
]

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

const App = () => {

    const todolist_title_1: string = "What to learn"
    const todolist_title_2: string = "What to buy"

    return (
        <div className="App">
            <TodolistItem title={todolist_title_1}
                          tasks={tasks_1}
                          date={"5.04.2025"}/>
            <TodolistItem title={todolist_title_2}
                          tasks={tasks_2}/>
        </div>
    );
}

export default App;
