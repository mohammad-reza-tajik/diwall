"use client"
import Grid from "@mui/material/Grid";
import type {SxProps} from "@mui/material/styles";

const styles = {
    backDrop : {
        width : "100vw",
        height : "100vh",
        bgcolor: "#000",
        opacity : .8,
        position : "fixed",
        top: 0,
        right : 0,
        zIndex: 900
    }
} satisfies Record<string, SxProps>

interface Props {
    setOpen:(open : boolean)=>void;
    open:boolean;
}

function BackDrop ({open, setOpen} : Props)  {

    return(
        <Grid sx={styles.backDrop} onClick={()=>setOpen(false)} display={open ? "block" : "none"}  />
    )
}

export default BackDrop;