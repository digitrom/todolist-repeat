import React, {FC} from "react";
import {TaskType} from "./App";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
}


export const TodolistItem: FC<TodolistType> = ({title,  tasks}) => {
    return (
        <div>
            <h1>{title}</h1>
            <ul>
                <input type="checkbox" checked={tasks[0].isDone}/>
                <li>{tasks[0].title}</li>
                <input type="checkbox" checked={true}/>
                <li>{tasks[1].title}</li>
                <input type="checkbox" checked={true}/>
                <li>{tasks[2].title}</li>
            </ul>
        </div>
    )
}