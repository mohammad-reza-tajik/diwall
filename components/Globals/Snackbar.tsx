import  MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useAppSelector , snackbarActions , useAppDispatch} from "../../store";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";


const styles = {

    display : "flex",
    alignItems : "center",
    gap : "2rem",
    width: 1,
    fontSize : "1.6rem"

}
const Snackbar : React.FC = () => {

    const snackbar = useAppSelector((state)=>state.snackbarReducer);
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(snackbarActions.closeSnackbar());
    }

    const action = (
        <IconButton
            size="large"
            sx={{color: "#fff" , position : "relative" , top : "-0.4rem"}}
            onClick={closeHandler}>
            <Close fontSize={"large"}/>
        </IconButton>
    )

    return (
        <MUISnackbar
            open={snackbar.isOpen}
            autoHideDuration={6_000}
            onClose={closeHandler}
            // action={action}
            anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
            <Alert action={action} variant="filled" onClose={closeHandler} severity={snackbar.status} sx={styles}>
                {snackbar.message}
            </Alert>
        </MUISnackbar>
    )


}

export default Snackbar