import React, {FC, useState} from "react";
import {FilterTaskType, TaskType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TodolistType = {
    title: string
    filteredTasks: Array<TaskType>
    date?: string
    setTasks: (tasks: TaskType[]) => void
    addTask: (onChangeValue: string) => void
    taskStatusHandler: (isDone: boolean, taskId: string) => void
    error: string | null
    setError: (error: string | null) => void
    filter: FilterTaskType
    onClickFilterHandler: (filterValue: FilterTaskType, todolistId: string) => void
    todoId: string
    deleteTask: (taskId: string) => void
    deleteAllTasks: () => void
}


export const TodolistItem: FC<TodolistType> = ({
                                                   title,
                                                   filteredTasks,
                                                   addTask,
                                                   taskStatusHandler,
                                                   error,
                                                   setError,
                                                   filter,
                                                   onClickFilterHandler,
                                                   todoId,
                                                   deleteTask,
                                                   deleteAllTasks
                                               }) => {

    const [onChangeValue, setOnChangeValue] = useState<string>("")


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setOnChangeValue(e.currentTarget.value)
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            addTask(onChangeValue.trim())
            setOnChangeValue("")
        }
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
                        }}></Button>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <ul>
                {filteredTasks.length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks.map(task => {

                            return (
                                <li className={task.isDone ? "isDone" : ""} key={task.id}>
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
                <Button className={filter === "All" ? "active-filter" : ""} title={"All"}
                        callback={() => onClickFilterHandler("All", todoId)}/>
                <Button className={filter === "Active" ? "active-filter" : ""} title={"Active"}
                        callback={() => onClickFilterHandler("Active", todoId)}/>
                <Button className={filter === "Completed" ? "active-filter" : ""} title={"Completed"}
                        callback={() => onClickFilterHandler("Completed", todoId)}/>
                <div><Button title={"Delete all tasks"} callback={deleteAllTasks}/></div>
            </div>
        </div>
    )
}