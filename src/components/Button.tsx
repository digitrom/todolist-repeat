import {FC} from "react";

type ButtonType = {
    title: string | null
    callback: () => void
}

export const Button: FC<ButtonType> = ({title,callback}) => {
    return (
        <button onClick={callback}>{title}</button>
    )
}