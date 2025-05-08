import React, {FC, useState} from "react";

type EditableSpanType = {
    title: string
}

export const EditableSpan: FC<EditableSpanType> = ({title}) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    function onDoubleClickHandler() {
        setEditMode(true)
    }

    return editMode ? <input value={title}/> : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
}