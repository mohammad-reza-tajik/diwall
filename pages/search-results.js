import {CircularProgress, Grid, Typography} from "@mui/material";
import SectionHeading from "../components/SectionHeading";
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Product from "../components/Product";

const SearchResults = () => {


    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()



    useEffect(()=>{
        setIsLoading(true)
        axios.post("/api/search", {search:router.query.search,all:true}).then(res => {
            setSearchResults(res.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)

        })
    },[router.query.search])



    return(
        <Grid container item xs={11} direction={"column"}>
            <Grid item xs>
                <SectionHeading text={`محصولات مرتبط با جستجو "${router.query.search}"`} />
            </Grid>
            <Grid container item xs spacing={25}>
                {isLoading ? <CircularProgress  color={"primary"} size={45}/> :
                    searchResults.length === 0 ?
                        <Grid container item xs minHeight={300} justifyContent={"center"} alignItems={"center"}>
                            <Typography variant={"h2"} fontFamily={"dana-demibold"}>هیچ محصولی مرتبط با جستجو شما موجود نیست !</Typography>
                </Grid> :
                    searchResults.map((product)=>

                        <Grid item xs={3} key={product._id}>
                            <Product {...product} />
                        </Grid>

                    )}



            </Grid>
        </Grid>
    )
}

export default SearchResults
