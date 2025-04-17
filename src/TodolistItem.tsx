import React, {FC, useState} from "react";
import {TaskType} from "./App";
import {Button} from "./Button";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    setTasks: (tasks: TaskType[]) => void
}

type FilterTaskType = "All" | "Active" | "Completed"


export const TodolistItem: FC<TodolistType> = ({
                                                   title,
                                                   tasks,
                                                   date,
                                                   setTasks
                                               }) => {

    const [filter, setFilter] = useState<FilterTaskType>("All")


    function deleteTaskHandler(id: number) {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    function onClickFilterHandler(filterValue: FilterTaskType) {
        console.log(filterValue)
        setFilter(filterValue)
    }

    let filteredTasks = tasks
    if (filter === "Active") {
        filteredTasks = tasks.filter((t) => !t.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter((t) => t.isDone)
    }


    return (
        <div className="todolist">
            <h1>{title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTasks.length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <span><Button callback={() => deleteTaskHandler(task.id)} title={"x"}/></span>
                                </li>
                            )
                        }
                    )}
            </ul>
            <div>
                <Button title={"All"} callback={() => onClickFilterHandler("All")}/>
                <Button title={"Active"} callback={() => onClickFilterHandler("Active")}/>
                <Button title={"Completed"} callback={() => onClickFilterHandler("Completed")}/>
                <div>{date}</div>
            </div>
        </div>
    )
}