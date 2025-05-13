import {SxProps} from "@mui/material";

export const boxFilterSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const boxDeleteAllTasksSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    mt: '10px'
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    p: 0,
    justifyContent: 'space-between',
    opacity: isDone ? 0.5 : 1,
})