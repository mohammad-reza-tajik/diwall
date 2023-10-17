import Grid from "@mui/material/Grid";
import MUIPagination  from "@mui/material/Pagination";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";

interface Props {
    lastPage? : number;
    currentPage? : number;

}

const Pagination : React.FC<Props> = ({lastPage,currentPage}) => {

    const [page, setPage] = useState(1)
    const router = useRouter()

    useEffect(()=>{
        if (router.query.page)
            setPage(+router.query.page)


    },[])

    const pageHandler = async ( _ , page : number) => {

        setPage(page);
        // to navigate to the same page with updated query parameters
        await router.push({pathname:router.pathname,query:{...router.query,page}})
    }

    return (
        <Grid component={"section"}  container item xs={12} my={20} justifyContent={"center"} alignItems={"center"}>
            <MUIPagination size={"large"} color={"primary"} variant={"outlined"} shape={"rounded"} count={lastPage}  page={page} hideNextButton={lastPage == 1 } hidePrevButton={lastPage == 1 } defaultPage={currentPage} onChange={pageHandler} />
        </Grid>
    )


}

export default React.memo(Pagination)