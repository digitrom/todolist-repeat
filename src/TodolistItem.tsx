import React, {FC} from "react";
import {FilterTaskType, TaskType, Todolist} from "./App";
import {Button} from "./components/Button";
import {CreateItem} from "./components/CreateItem";
import {EditableSpan} from "./EditableSpan";

type TodolistItemType = {
    filteredTasks: { [key: string]: Array<TaskType> }
    addTask: (title: string, todolistId: string) => void
    taskStatusHandler: (todolistId: string, isDone: boolean, taskId: string) => void
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
        onClickFilterHandler,
        todolist: {id, title, filter},
        deleteTask,
        deleteAllTasks,
        deleteTodolist
    } = props

    const addItem = (title: string) => {
        addTask(title, id)
    }


    function deleteTodolistHandler() {
        deleteTodolist(id)
    }

    return (
        <div className="todolist">
            <div className={"container"}>
                <h3>{title}</h3>
                <Button title={'x'} callback={deleteTodolistHandler}/>
            </div>

            <CreateItem addItem={addItem}/>
            <ul>
                {filteredTasks[id].length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks[id].map(task => {

                            return (
                                <li className={task.isDone ? "isDone" : ""} key={task.id}>
                                    <input type="checkbox" checked={task.isDone}
                                           onChange={(e) => taskStatusHandler(id, e.currentTarget.checked, task.id)}/>
                                    <EditableSpan title={task.title}/>
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
                <div><Button title={"Delete all tasks"} callback={() => deleteAllTasks(id)}/></div>
            </div>
        </div>
    )
}

