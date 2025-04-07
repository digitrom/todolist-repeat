import React, {FC} from "react";
import {TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
}


export const TodolistItem: FC<TodolistType> = ({title,  tasks, date}) => {
    return (
        <div className="todolist">
            <h1>{title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={tasks[0].isDone}/>
                    <span>{tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>{tasks[1].title}</span></li>
                <li>
                    <input type="checkbox" checked={true}/>
                    <span>{tasks[2].title}</span>
                </li>
                   </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
                <div>{date}</div>
            </div>
        </div>
    )
}