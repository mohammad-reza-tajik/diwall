import {Grid,Pagination as MUIPagination, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

const Pagination = (props) => {

    const [page, setPage] = useState(1)
    const router = useRouter()
    // console.log(props)
    // console.log(props)
    console.log("hellor from pagination")

    useEffect(()=>{
        if (router.query.page)
            setPage(+router.query.page)
        // else
            // router.push({pathname:router.pathname,query:{...router.query,page}})


    },[])



    const pageHandler = async (event, page) => {

        setPage(page);
        // to navigate to the same page with updated query parameters
        await router.push({pathname:router.pathname,query:{...router.query,page}})

    }

    return (
        <Grid component={"section"} container item xs={12} my={20} justifyContent={"center"} alignItems={"center"}>
            <MUIPagination size={"large"} color={"primary"} variant={"outlined"} shape={"rounded"} count={props.lastPage}  page={page} hideNextButton={props.lastPage == 1 } hidePrevButton={props.lastPage == 1 } defaultPage={props.currentPage} onChange={pageHandler} />
        </Grid>
    )


}

export default React.memo(Pagination)