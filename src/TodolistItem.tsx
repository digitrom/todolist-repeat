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
    taskStatusHandler: (isDone: boolean, taskId: string) => void
    error: string | null
    setError: (error: string | null) => void
}

type FilterTaskType = "All" | "Active" | "Completed"


export const TodolistItem: FC<TodolistType> = ({
                                                   title,
                                                   tasks,
                                                   date,
                                                   setTasks,
                                                   addTask,
                                                   taskStatusHandler,
                                                   error,
                                                   setError
                                               }) => {

    const [filter, setFilter] = useState<FilterTaskType>("All")
    const [onChangeValue, setOnChangeValue] = useState<string>("")

    // const [taskStatus, setTaskStatus] = useState<boolean>(false)

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

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
            setError(null)
        if (e.key === 'Enter') {
            addTask(onChangeValue.trim())
            setOnChangeValue("")
        }
    }

    function deleteAllTasks() {
        setTasks([])
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
                <Input
                    className={error ? "input-error" : ""}
                    title={onChangeValue}
                    callback={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                />
                <Button title={"+"}
                        callback={() => {
                            addTask(onChangeValue);
                            setOnChangeValue("")
                            setFilter("All")
                        }}></Button>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <ul>
                {filteredTasks.length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks.map(task => {

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}
                                           onChange={(e) => taskStatusHandler(e.currentTarget.checked, task.id)}/>
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
                <div><Button title={"Delete all tasks"} callback={deleteAllTasks}/></div>
                <div>{date}</div>
            </div>
        </div>
    )
}