import React, {FC, useState} from "react";

type EditableSpanType = {
    value: string
    onChange: (title:string) => void
}

export const EditableSpan: FC<EditableSpanType> = ({value,
                                                       onChange}) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const[title, setTitle]=useState<string>(value)

    function turnOnEditMode () {
        setIsEditMode(true)
    }

    function turnOffEditMode () {
        setIsEditMode(false)
        onChange(title)
    }

    function onChangeTitleHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            turnOffEditMode()
        }
    }

    return (
        <>
            {isEditMode ?
                <input value={title} onChange={onChangeTitleHandler}
                       onBlur={turnOffEditMode} autoFocus
                       onKeyDown={onKeyDownHandler}
                /> :
                <span onDoubleClick={turnOnEditMode}>{value}</span>}
        </>
    )
}