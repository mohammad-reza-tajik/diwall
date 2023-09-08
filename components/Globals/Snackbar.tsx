import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useAppSelector, snackbarActions, useAppDispatch} from "@/store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import type {SxProps} from "@mui/system";


const styles = {
    alert: {
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        position: "relative",
        width: 1,
        fontSize: {xs: 13, md: 16},
    }
} satisfies Record<string, SxProps>
const Snackbar: React.FC = () => {

    const snackbar = useAppSelector((state) => state.snackbarReducer);
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(snackbarActions.closeSnackbar());
    }

    const action = (
        <IconButton
            size="large"
            sx={{color: "#fff", position: "absolute", top: 0, left: 0}}
            onClick={closeHandler}>
            <Close fontSize={"large"}/>
        </IconButton>
    )

    return (
        <MUISnackbar
            open={snackbar.isOpen}
            autoHideDuration={6_000}
            onClose={closeHandler}
            TransitionComponent={Slide}
            // action={action}
            anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
            <Alert action={action} variant="filled" onClose={closeHandler} severity={snackbar.status} sx={styles.alert}>
                {snackbar.message}
            </Alert>
        </MUISnackbar>
    )


}

export default Snackbar