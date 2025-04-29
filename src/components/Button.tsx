import {FC} from "react";

type ButtonType = {
    title: string | null
    callback: () => void
    className?: string
}

export const Button: FC<ButtonType> = ({title,callback, className}) => {
    return (
        <button  className={className} onClick={callback}>{title}</button>
    )
}