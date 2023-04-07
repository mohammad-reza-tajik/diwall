import React from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";


const styles = {
    searchResultsContainer: {
        position: "absolute",
        top: {xs: 120, md: "100%"},
        right: 0,
        width: {xs: 1, md: 400},
        zIndex: 1001,
        p: "1rem",
        // maxHeight:300,
        border: {xs: "none", md: "1px solid #ccc"},
        borderTop: "none",
        bgcolor: "white.main",
        // bgcolor: "coral",
        justifyContent: "center",
        alignItems: "center",


    },
    titleInResults: {
        color: "#444",
        fontSize: "1.2rem",
        "&:hover": {
            bgcolor: "rgba(#000000,.2)"
        }
    },
    searchResultsItem : {
        bgcolor: "white.main",
        gap: 10,
        p: 5,
        cursor:"pointer",
        "&:hover" : {
            bgcolor:"background.paper"
        }
    }


}

interface Props {
    isLoading: boolean;
    results: any;
    search: string;
    submitSearchHandler: (event?) => void
    onOpen?: (a: boolean) => void;
    onClose?: () => void;

}

const SearchResults: React.FC<Props> = (props) => {

    const {isLoading, results, search, submitSearchHandler, onOpen, onClose} = props;
    const router = useRouter();


    const goToProductHandler = (title) => {
        if (onClose) {
            onClose()
        } else {
            onOpen(false)
        }
        router.push(`/products/${title.split(" ").join("_")}`)

    }


    return (
        <Grid container item xs={12} sx={styles.searchResultsContainer}>

            {
                isLoading ?
                    <Grid container justifyContent={"center"} alignItems={"center"}>
                        <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    <>
                        <Grid component={"ul"} container item xs={12}>
                            {results.map((result) => {
                                if (search.trim().length >= 3 && results.length !== 0) {

                                    return (
                                        <Grid container item alignItems={"center"} xs={12} key={result._id}
                                              onClick={() => goToProductHandler(result.title)}
                                              sx={styles.searchResultsItem}>

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
                            {results.length === 0 && search.trim().length >= 3 && !isLoading &&  (
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
                        </Grid>
                    </>

            }


        </Grid>
    )
}

export default SearchResults