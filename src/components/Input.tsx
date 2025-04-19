import React, {FC} from "react";

type InputType = {
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
    title: string

}

export const Input: FC<InputType> = ({title, callback}) => {
    return (
        <input value={title} onChange={callback}/>
    )
}