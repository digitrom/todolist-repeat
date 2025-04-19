import React, {FC} from "react";

type InputType = {
    setOnChangeValue: (title:string) => void
    title: string

}

export const Input: FC<InputType> = ({title, setOnChangeValue}) => {
    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement >) {
        setOnChangeValue(e.currentTarget.value)
    }
    return (
        <input value={title} onChange={onChangeHandler}/>
    )
}