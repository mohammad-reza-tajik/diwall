import React, {FormEvent} from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import type {ProductType} from "@/db/productModel";
import type {SxProps} from "@mui/system";


const styles = {
    searchResultsContainer: {
        width: 1,
        border: {xs: "none", md: "1px solid #ccc"},
        borderTop: "none",
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        gap: 10,
        p: 5,
        cursor: "pointer",
        opacity :1,
        transition : "all .5s",

    }
} satisfies Record<string, SxProps>

interface Props {
    isLoading: boolean;
    results: ProductType[];
    search: string;
    submitSearchHandler: (event: FormEvent) => void
    closeSearch: () => void;

}

const SearchResults: React.FC<Props> = ({isLoading, results, search, submitSearchHandler, closeSearch}) => {

    const router = useRouter();

    const goToProductHandler = (slug: string) => {
        closeSearch()
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
                        <Grid component={"ul"} container item xs={12} sm={10}>
                            {results.map((result) => {
                                if (search.trim().length >= 3 && results.length !== 0) {
                                    return (
                                        <Grid container item alignItems={"center"} xs={12} key={result._id}
                                              onClick={() => goToProductHandler(result.slug)}
                                              sx={styles.item}>

                                            <Grid item xs={"auto"}>
                                                <Image
                                                    src={`/assets/pictures/products/${result.slug}.jpg`}
                                                    alt={result.title}
                                                    width={50}
                                                    height={50}
                                                />
                                            </Grid>
                                            <Grid item xs={true}>
                                                <Typography variant={"h5"} fontSize={"1.2rem"}>
                                                    {result.title}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    )
                                }
                            })}
                            {results.length === 0 && search.trim().length >= 3 && !isLoading && (
                                <Grid container justifyContent={"center"} alignItems={"center"} p={10}>
                                    <Typography variant={"h5"} fontSize={16}>
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