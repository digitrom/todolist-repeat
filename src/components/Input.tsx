    import React, {FC} from "react";

    type InputType = {
        callback: (e: React.ChangeEvent<HTMLInputElement>) => void
        title: string
        onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void
        className?: string
    }

    export const Input: FC<InputType> = ({title, callback, onKeyDownHandler, className}) => {
        return (
            <input value={title}
                   onChange={callback}
                   onKeyDown={onKeyDownHandler}
                   className={className}
            />
        )
    }