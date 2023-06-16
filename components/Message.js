import { Alert, AlertTitle } from "@mui/material";


export function Message({info}) {
    return(
        <>
        <Alert>
            <AlertTitle>{info}</AlertTitle>
        </Alert>
        </>
    )
}