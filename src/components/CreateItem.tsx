import React, {FC, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type Props = {
    addItem: (title: string) => void
}

export const CreateItem: FC<Props> = ({addItem}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    function changeItemTitleHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    function createItemOnEnterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
            setTitle('')
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <TextField
                label={"Type name"}
                className={error ? "input-error" : ""}
                value={title}
                onKeyDown={createItemOnEnterHandler}
                onChange={changeItemTitleHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton  onClick={createItemHandler} color={"primary"}><ControlPoint/></IconButton>
        </div>

    )

}