import Grid from "@mui/material/Grid";
import MUIPagination  from "@mui/material/Pagination";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import formUrlQuery from "@/utils/formUrlQuery";

interface Props {
    lastPage? : number;
    currentPage? : number;

}

function Pagination  ({lastPage,currentPage} : Props)  {

    const [page, setPage] = useState(1)
    const router = useRouter()
    const searchParams = useSearchParams();

    useEffect(()=>{
        if (searchParams.get("page"))
            setPage(+searchParams.get("page"))


    },[searchParams])

    const pageHandler = ( _ , page : number) => {
        setPage(page);
        // to navigate to the same page with updated query parameters
        router.push(formUrlQuery(searchParams.toString(),{
            params : {
                page
            }
        }),{scroll : true})
    }

    return (
        <Grid component={"section"}  container item xs={12} my={20} justifyContent={"center"} alignItems={"center"}>
            <MUIPagination size={"large"} color={"primary"} variant={"outlined"} shape={"rounded"} count={lastPage}  page={page} hideNextButton={lastPage == 1 } hidePrevButton={lastPage == 1 } defaultPage={currentPage} onChange={pageHandler} />
        </Grid>
    )


}

export default Pagination