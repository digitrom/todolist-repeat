import {FC} from "react";

type ButtonType = {
    title: string
}

export const Button: FC<ButtonType> = ({title}) => {
    return (
        <button>{title}</button>
    )
}