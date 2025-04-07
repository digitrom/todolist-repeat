import React, {FC} from "react";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
}


export const TodolistItem: FC<TodolistType> = ({title, tasks, date}) => {
    return (
        <div className="todolist">
            <h1>{title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.length === 0 ?
                    <p>Todolist is empty</p> :
                    tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                </li>
                            )
                        }
                    )}
            </ul>
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
                <div>{date}</div>
            </div>
        </div>
    )
}