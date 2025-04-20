import React, {FC} from "react";

type InputType = {
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
    title: string
    onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Input: FC<InputType> = ({title, callback, onKeyDownHandler}) => {
    return (
        <input value={title} onChange={callback} onKeyDown={onKeyDownHandler}/>
    )
}