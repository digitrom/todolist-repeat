import React, {useState} from 'react';
import './App.css';
import {v4} from "uuid";
import {TodolistItem} from "./TodolistItem";
import {CreateItem} from "./components/CreateItem";
import {
    AppBar,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "./NavButton";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type TasksState = {
    [key: string]: TaskType[]
}

export type Todolist = {
    id: string
    title: string
    filter: FilterTaskType
}
export type FilterTaskType = "All" | "Active" | "Completed"

export type ThemeMode = 'dark' | 'light'

const App = () => {

    const todolistId1 = v4()
    const todolistId2 = v4()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: "Todo1", filter: "Completed"},
        {id: todolistId2, title: "Todo2", filter: "Active"}
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {title: "JS/TS", isDone: false, id: v4()},
            {title: "React", isDone: true, id: v4()},
            {title: "Redux", isDone: true, id: v4()},
            {title: "Svelte", isDone: false, id: v4()},
        ],
        [todolistId2]: [
            {title: "Rest API", isDone: false, id: v4()},
            {title: "GraphQL", isDone: false, id: v4()},
            {title: "Express", isDone: false, id: v4()},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    function onClickFilterHandler(filterValue: FilterTaskType, todolistId: string) {
        setTodolists(todolists.map(tl =>
            tl.id === todolistId ? {...tl, filter: filterValue} : tl
        ))
    }

    function deleteAllTasks(todolistId: string) {
        setTasks({...tasks, [todolistId]: []})

    }

    function deleteTask(todolistId: string, taskId: string) {
        setTasks(
            {...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId)})
    }

    const taskStatusHandler = (todolistId: string, isDone: boolean, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((t) => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        }
        setTasks(newTasks)
    }

    function deleteTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        const newTask: TaskType = {title: title, isDone: false, id: v4()}
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    function addTodolist(title: string) {
        const newTodo: Todolist = {id: v4(), title: title, filter: "Active"}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodo.id]: []})

    }

    function changeTodolistTitle(newTitle: string, todolistId: string) {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }

//q

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <CssBaseline/>
                    <Toolbar>
                        <Container maxWidth={'lg'}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                        </Container>
                        <div>
                            <NavButton color="inherit">Sign in</NavButton>
                            <NavButton color="inherit">Sign up</NavButton>
                            <NavButton color="inherit"
                                       background={theme.palette.primary.dark}>Faq</NavButton>
                            <Switch color={'default'} onChange={changeMode}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={"lg"}>
                    <Paper sx={{m: '0px 0px 30px 0px', p: '0px 0px -200px -200px'}} elevation={6}>
                        <Grid container>
                            <CreateItem addItem={addTodolist}/>
                        </Grid>
                    </Paper>
                    <Grid container spacing={4}>{todolists.map(tl => {
                        let filteredTasks = tasks
                        if (tl.filter === "Active") {
                            filteredTasks = {...tasks, [tl.id]: tasks[tl.id].filter((t) => !t.isDone)}
                        }
                        if (tl.filter === "Completed") {
                            filteredTasks = {...tasks, [tl.id]: tasks[tl.id].filter((t) => t.isDone)}
                        }
                        return (
                            <Grid key={tl.id}>
                                <Paper elevation={6} sx={{p: '10px 20px 20px 20px'}}>
                                    <TodolistItem
                                        key={tl.id}
                                        filteredTasks={filteredTasks}
                                        addTask={addTask}
                                        taskStatusHandler={taskStatusHandler}
                                        onClickFilterHandler={onClickFilterHandler}
                                        todolist={tl}
                                        deleteTask={deleteTask}
                                        deleteAllTasks={deleteAllTasks}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    /></Paper>
                            </Grid>)
                    })}
                    </Grid>
                </Container></ThemeProvider>

        </div>
    );
}

export default App;