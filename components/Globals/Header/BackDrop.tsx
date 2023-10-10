import React from "react";
import Grid from "@mui/material/Grid";

interface Props {
    // eslint-disable-next-line no-unused-vars
    onOpen:(open : boolean)=>void;
    open:boolean;
}
const BackDrop : React.FC<Props> = (props) => {

    const openHandler = () => {
      props.onOpen(false)
    }

    return(
        <Grid width={"100vw"} height={"100vh"} bgcolor={"rgba(0,0,0,.2)"} position={"fixed"} top={0} right={0} onClick={openHandler} display={props.open ? "block" : "none"} zIndex={900} />

    )

}

export default BackDrop;