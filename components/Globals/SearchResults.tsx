import React, {FormEvent} from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";


const styles: Record<string, SxProps> = {
    searchResultsContainer: {
        position: "absolute",
        top: {xs: 120, md: "100%"},
        right: 0,
        width: {xs: 1, md: 400},
        zIndex: 1001,
        p: "1rem",
        border: {xs: "none", md: "1px solid #ccc"},
        borderTop: "none",
        bgcolor: "white.main",
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
    results: ProductType[];
    search: string;
    submitSearchHandler: (event : FormEvent) => void
    onOpen?: (open: boolean) => void;
    onClose?: () => void;

}

const SearchResults: React.FC<Props> = (props) => {

    const {isLoading, results, search, submitSearchHandler, onOpen, onClose} = props;
    const router = useRouter();


    const goToProductHandler = (slug :string) => {
        if (onClose) {
            onClose()
        } else {
            onOpen(false)
        }
        router.push(`/products/${slug}`)

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
                                              onClick={() => goToProductHandler(result.slug)}
                                              sx={styles.searchResultsItem}>

                                            <Grid item xs={"auto"}>
                                                <Image
                                                    src={`/assets/pictures/products/${result.slug}.jpg`}
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