import React, {FC, useState} from "react";

type Props = {
    addItem: (title: string) => void
}

export const CreateItem: FC<Props> = ({addItem}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    function changeItemTitleHandler (e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    function createItemOnEnterHandler (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler  = () => {
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
            <input
                className={error ? "input-error" : ""}
                value={title}
                onKeyDown={createItemOnEnterHandler }
                onChange={changeItemTitleHandler }
            />
            <button onClick={createItemHandler}>+</button>
            {
                error && <div className={"error"}>{error}</div>
            }
        </div>

    )

}