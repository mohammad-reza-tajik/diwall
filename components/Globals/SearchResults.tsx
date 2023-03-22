import React, {useCallback} from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import {useRouter} from "next/router";


const styles = {
    searchResultsContainer: {
        position: {xs: "static", md: "absolute"},
        top: "100%",
        right: 0,
        width: {xs: 1, md: 400},
        zIndex: 50,
        p: "1rem",
        border: "1px solid #ccc",
        borderTop: "none",
        bgcolor: "white.main",
        justifyContent: "center",
        alignItems: "center",


    },
    titleInResults: {
        color: "#444",
        fontSize: "1.2rem"
    }


}

interface Props {
    isLoading: boolean;
    results: any;
    search: string;
    submitSearchHandler: (event?) => void

}

const SearchResults: React.FC<Props> = (props) => {

    const {isLoading, results, search, submitSearchHandler} = props;
    const router = useRouter();


    const goToProductHandler = useCallback((id) => {
        router.push(`/products/${id}`)

    }, [])


    return (
        <Grid item xs={12} sx={styles.searchResultsContainer}>

            {
                isLoading ?
                    <Grid container justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    <>
                        <ul>
                            {results.map((result) => {
                                if (search.trim().length >= 3 && results.length !== 0) {

                                    return (
                                        <Grid container item alignItems={"center"} xs={12} key={result._id}
                                            onClick={() => goToProductHandler(result._id)}
                                            sx={{gap: 10, p: 5}} >

                                            <Grid item xs={"auto"}>
                                                <Image
                                                    src={`/assets/pictures/products/${result.title?.replaceAll(" ", "-")}.jpg`}
                                                    alt={result.title}
                                                    width={50}
                                                    height={50}
                                                />
                                            </Grid>
                                            <Grid item xs={true}>
                                                <Typography variant={"h4"} sx={styles.titleInResults}>
                                                    {result.title}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    )
                                }


                            })}
                            {results.length === 0 && search.trim().length >= 3 && (
                                <Grid container justifyContent={"center"} alignItems={"center"} p={10}>
                                    <Typography variant={"h5"} color={"#666"} fontSize={16}>
                                        نتیجه ای یافت نشد!
                                    </Typography>
                                </Grid>
                            )
                            }
                            {results.length !== 0 && search.trim() !== "" &&
                                <Button variant={"contained"} onClick={submitSearchHandler}
                                        sx={{width: 1, fontSize: 14, mt: 15}}>
                                    مشاهده بیشتر
                                </Button>
                            }
                        </ul>
                    </>

            }


        </Grid>
    )
}

export default SearchResults