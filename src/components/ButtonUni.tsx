import {FC, ReactNode} from "react";
import {IconButton, Button} from "@mui/material";

type BaseButtonProps = {
    callback: () => void
    className?: string
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
    disabled?: boolean
    size?: "small" | "medium" | "large";
}

type TextButtonProps = BaseButtonProps & {
    title: string | null
    icon?: ReactNode;
    iconOnly?: false;
    variant?: "text" | "outlined" | "contained";
};

type IconOnlyButtonProps = BaseButtonProps & {
    icon: ReactNode;
    iconOnly: true;
};


type ButtonType = TextButtonProps | IconOnlyButtonProps;

export const ButtonUni: FC<ButtonType> = (props) => {
    const {
        callback,
        className,
        color = "inherit",
        disabled = false,
        size = "medium",
    } = props

    if (props.iconOnly) {
        return (
            <IconButton className={className} onClick={callback}>{props.icon}</IconButton>
        )
    }

    return (
        <Button onClick={callback}
                className={className}
                variant={props.variant ?? "contained"}
                color={color}
                disabled={disabled}
                size={size}
        >
            {props.title}
            </Button>
    )
}