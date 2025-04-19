import React, {FC, useState} from "react";
import {TaskType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TodolistType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    setTasks: (tasks: TaskType[]) => void
    addTask: (onChangeValue: string) => void
}

type FilterTaskType = "All" | "Active" | "Completed"


export const TodolistItem: FC<TodolistType> = ({
                                                   title,
                                                   tasks,
                                                   date,
                                                   setTasks,
                                                   addTask
                                               }) => {

    const [filter, setFilter] = useState<FilterTaskType>("All")
    const [onChangeValue, setOnChangeValue] = useState<string>("")

    // console.log(onChangeValue)
    function deleteTask(id: string) {
        setTasks(tasks.filter((t) => t.id !== id))
    }

    function onClickFilterHandler(filterValue: FilterTaskType) {
        setFilter(filterValue)
    }

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setOnChangeValue(e.currentTarget.value)
        // console.log(e.currentTarget.value)
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
                <Input title={onChangeValue} callback={onChangeHandler}/>
                <Button title={"+"}
                        callback={()=>{
                            addTask(onChangeValue);
                            setOnChangeValue("")
                            setFilter("All")
                        }}></Button>
            </div>
            <ul>
                {filteredTasks.length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button callback={() => deleteTask(task.id)} title={"x"}/>
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