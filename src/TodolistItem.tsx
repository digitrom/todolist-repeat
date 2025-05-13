import React, {FC} from "react";
import {FilterTaskType, TaskType, Todolist} from "./App";
import {ButtonUni} from "./components/ButtonUni";
import {CreateItem} from "./components/CreateItem";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {boxDeleteAllTasksSx, boxFilterSx, getListItemSx} from "./TodolistItem.styles";

type TodolistItemType = {
    filteredTasks: { [key: string]: Array<TaskType> }
    addTask: (title: string, todolistId: string) => void
    taskStatusHandler: (todolistId: string, isDone: boolean, taskId: string) => void
    onClickFilterHandler: (filterValue: FilterTaskType, todolistId: string) => void
    todolist: Todolist
    deleteTask: (id: string, taskId: string) => void
    deleteAllTasks: (id: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, title: string, taskId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
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
                <h3><EditableSpan onChange={(title) => changeTodolistTitle(title, id)} value={title}/></h3>
                <ButtonUni iconOnly icon={<DeleteIcon/>} callback={deleteTodolistHandler}/>
            </div>

            <CreateItem addItem={addItem}/>
            <List>
                {filteredTasks[id].length === 0 ?
                    <p>Todolist is empty</p> :
                    filteredTasks[id].map(task => {
                        function changeTaskTitleHandler(title: string) {
                            changeTaskTitle(id, task.id, title)
                        }

                        function changeTaskStatusHandler(e: React.ChangeEvent<HTMLInputElement>) {
                        taskStatusHandler(id, e.currentTarget.checked, task.id)
                    }

                        return (
                        <ListItem sx={getListItemSx(task.isDone)} key={task.id}>
                        <div>
                        <Checkbox color={"primary"}
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                        />
                        <EditableSpan onChange={changeTaskTitleHandler}
                        value={task.title}
                        />
                        </div>
                        <ButtonUni iconOnly icon={<DeleteIcon/>} callback={() => deleteTask(id, task.id)}/>
                        </ListItem>
                        )
                    }
                        )}
                </List>
            <Box sx={boxFilterSx}>
                <ButtonUni variant={filter === "All" ? "contained": "text"} title={"All"}
                           callback={() => onClickFilterHandler("All", id)}/>
                <ButtonUni variant={filter === "Active" ? "contained" : "text"} title={"Active"}
                           callback={() => onClickFilterHandler("Active", id)}/>
                <ButtonUni variant={filter === "Completed" ? "contained" : "text"} title={"Completed"}
                           callback={() => onClickFilterHandler("Completed", id)}/>
            </Box>
            <Box sx={boxDeleteAllTasksSx}>
                <div><ButtonUni variant={"text"} title={"Delete all tasks"} callback={() => deleteAllTasks(id)}/></div>
            </Box>
        </div>
    )
}

