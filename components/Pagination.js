import {Grid, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Pagination = (props) => {

    const [page, setPage] = useState(1)
    const router = useRouter()
    console.log(props)
    // console.log(props)

    useEffect(()=>{
        if (router.query.page)
            setPage(+router.query.page)

    },[])



    const pageHandler = async (event, page) => {
        // the bottom line is written like this so that only one tab can be active or disabled at a time
        if (page !== null)
            setPage(page);

        // to navigate to the same page with updated query parameters
        await router.push({pathname:router.pathname,query:{...router.query,page}})

    }

    return (
        <Grid component={"section"} container item xs={12} my={20} justifyContent={"center"} alignItems={"center"}>


            <ToggleButtonGroup fullWidth={false} size={"large"} sx={{gap: 10, p: 10}} color={"primary"} value={page} exclusive
                               onChange={pageHandler}>

                {props.currentPage !== 1 && <ToggleButton sx={{width: 40, height: 40, fontSize: "1.6rem"}}
                                                          value={1}>{1}</ToggleButton>}
                {props.currentPage !== 1 && props.currentPage !== 2 &&
                    <Grid component={"p"} fontSize={16} position={"relative"} top={5}>....</Grid>}

                {props.hasPreviousPage && props.currentPage !== 2 &&<ToggleButton sx={{width: 40, height: 40, fontSize: "1.6rem"}}
                                                        value={props.previousPage}>{props.previousPage}</ToggleButton>}


                <ToggleButton sx={{width: 40, height: 40, fontSize: "1.6rem"}}
                              value={props.currentPage}>{props.currentPage}</ToggleButton>

                {props.hasNextPage && <ToggleButton sx={{width: 40, height: 40, fontSize: "1.6rem"}}
                                                    value={props.nextPage}>{props.nextPage}</ToggleButton>}

                {props.lastPage !== props.currentPage && props.lastPage !== props.nextPage &&
                    <Grid component={"p"} fontSize={16} position={"relative"} top={5}>....</Grid>}

                {props.lastPage !== props.currentPage && props.lastPage !== props.nextPage &&
                    <ToggleButton sx={{width: 40, height: 40, fontSize: "1.6rem"}}
                                  value={props.lastPage}>{props.lastPage}</ToggleButton>}


            </ToggleButtonGroup>


        </Grid>
    )


}

export default Pagination