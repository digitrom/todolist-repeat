import React, {FC, useState} from "react";
import {FilterTaskType, TaskType, Todolist} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TodolistItemType = {
    filteredTasks: {[key:string]:Array<TaskType>}
    addTask: (onChangeValue: string, todolistId: string) => void
    taskStatusHandler: (todolistId: string, isDone: boolean, taskId: string) => void
    error: string | null
    setError: (error: string | null) => void
    onClickFilterHandler: (filterValue: FilterTaskType, todolistId: string) => void
    todolist: Todolist
    deleteTask: (id: string, taskId: string) => void
    deleteAllTasks: (id: string) => void
    deleteTodolist: (todolistId: string) => void
}


export const TodolistItem: FC<TodolistItemType> = (props) => {

    const {
        filteredTasks,
        addTask,
        taskStatusHandler,
        error,
        setError,
        onClickFilterHandler,
        todolist: {id, title, filter},
        deleteTask,
        deleteAllTasks,
        deleteTodolist
    } = props

    const [onChangeValue, setOnChangeValue] = useState<string>("")


    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setOnChangeValue(e.currentTarget.value)
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            addTask(onChangeValue.trim(), id)
            setOnChangeValue("")
        }
    }

     function deleteTodolistHandler () {
        deleteTodolist(id)
    }

    return (
        <div className="todolist">
            <div className={"container"}>
                <h3>{title}</h3>
                <Button title={'x'} callback={deleteTodolistHandler}/>
            </div>
            <div>
                <Input
                    className={error ? "input-error" : ""}
                    title={onChangeValue}
                    callback={onChangeHandler}
                    onKeyDownHandler={onKeyDownHandler}
                />
                <Button title={"+"}
                        callback={() => {
                            addTask(onChangeValue.trim(), id);
                            setOnChangeValue("")
                        }}></Button>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <ul>
                {filteredTasks[id].length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks[id].map(task => {

                            return (
                                <li className={task.isDone ? "isDone" : ""} key={task.id}>
                                    <input type="checkbox" checked={task.isDone}
                                           onChange={(e) => taskStatusHandler(id, e.currentTarget.checked, task.id)}/>
                                    <span>{task.title}</span>
                                    <Button callback={() => deleteTask(id, task.id)} title={"x"}/>
                                </li>
                            )
                        }
                    )}
            </ul>
            <div>
                <Button className={filter === "All" ? "active-filter" : ""} title={"All"}
                        callback={() => onClickFilterHandler("All", id)}/>
                <Button className={filter === "Active" ? "active-filter" : ""} title={"Active"}
                        callback={() => onClickFilterHandler("Active", id)}/>
                <Button className={filter === "Completed" ? "active-filter" : ""} title={"Completed"}
                        callback={() => onClickFilterHandler("Completed", id)}/>
                <div><Button title={"Delete all tasks"} callback={()=>deleteAllTasks(id)}/></div>
            </div>
        </div>
    )
}