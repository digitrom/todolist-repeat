import React, {FC, useState} from "react";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    setTasks: (tasks:TaskType[]) => void
}


export const TodolistItem: FC<TodolistType> = ({title,
                                                   tasks,
                                                   date,
                                               setTasks}) => {



    function onClickHandler(id:number) {
setTasks(tasks.filter((t)=> t.id !== id))
    }


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
                                    <span><Button callback={() => onClickHandler(task.id)} title={"x"}/></span>
                                </li>
                            )
                        }
                    )}
            </ul>
            <div>
                {/*<Button title={"All"}/>*/}
                {/*<Button title={"Active"}/>*/}
                {/*<Button title={"Completed"}/>*/}
                <div>{date}</div>
            </div>
        </div>
    )
}