import Grid from "@mui/material/Grid";
import MUIPagination  from "@mui/material/Pagination";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

interface Props {
    lastPage? : number;
    currentPage? : number;
    productsCount? : number;

}

const Pagination : React.FC<Props> = (props) => {

    const [page, setPage] = useState(1)
    const router = useRouter()

    useEffect(()=>{
        if (router.query.page)
            setPage(+router.query.page)


    },[])

    const pageHandler = async ( _ , page) => {

        setPage(page);
        // to navigate to the same page with updated query parameters
        await router.push({pathname:router.pathname,query:{...router.query,page}})
    }

    return (
        <Grid component={"section"}  container item xs={12} my={20} justifyContent={"center"} alignItems={"center"}>
            <MUIPagination size={"large"} color={"primary"} variant={"outlined"} shape={"rounded"} count={props.lastPage}  page={page} hideNextButton={props.lastPage == 1 } hidePrevButton={props.lastPage == 1 } defaultPage={props.currentPage} onChange={pageHandler} />
        </Grid>
    )


}

export default React.memo(Pagination)