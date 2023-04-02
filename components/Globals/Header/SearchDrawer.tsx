import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import React from "react";

import SearchResults from "../SearchResults";
import useSearch from "../../../hooks/useSearch";


const styles = {
    searchField: {
        width: {xs: 1, sm: .6, md: .6},
        fontSize: {xs: 4, sm: "2rem"},
        bgcolor: "#fff",

    },
    searchIcon: {
        fontSize: 25,
        color: "primary.main",
    },
    closeIcon: {
        color: "white.main",
        fontSize: 35,
        bgcolor: "primary.main",
        borderRadius: 20,

    },

    searchDrawer: {
        minHeight: "100vh",
        backgroundColor: "white.main",
        // backgroundColor: "green",

        position: "fixed",
        top: 0,
        right: 0,
        width: "100vw",
        px: 20,
        pt: 30,
        // justifyContent: "center",
        // alignItems: "center",
        transition: "all .6s",
        zIndex: 1000


    }


}

interface Props {
    onOpen: any;
    open: boolean;
}

const SearchDrawer: React.FC<Props> = (props) => {

    const {search , isWrong , submitSearchHandler , searchChangeHandler , results , isLoading } = useSearch("mobile" , props);

    return (
        <Grid container item xs={12} component={"form"} onSubmit={submitSearchHandler} sx={{
            ...styles.searchDrawer,
            transform: props.open ? "translateY(0)" : "translateY(-100%)"
        }}>
            <Grid item xs={true} maxHeight={80} overflow={"hidden"} bgcolor={"royalblue"} position={"absolute"} top={30} right={15}>
                <Tooltip title={"لطفا عبارتی برای جستجو وارد کنید!"} open={isWrong} placement={"bottom"}
                         arrow>
                    <TextField
                        error={isWrong}
                        fullWidth
                        placeholder={"جستجو ..."}
                        value={search}
                        onChange={searchChangeHandler}
                        sx={styles.searchField}
                        variant="outlined"
                        size={"medium"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton type={"submit"} aria-label="search">
                                        <Search sx={styles.searchIcon}/>
                                    </IconButton>
                                </InputAdornment>
                            ),

                        }}
                    />
                </Tooltip>
            </Grid>
            <Grid item xs={"auto"} maxHeight={80} position={"absolute"} top={30} left={10}>
                <IconButton onClick={() => props.onOpen(false)} aria-label="close search drawer">
                    <Close sx={styles.closeIcon}/>
                </IconButton>

            </Grid>



            {
                search.trim().length >= 3 &&
                <SearchResults isLoading={isLoading} results={results} search={search}
                               submitSearchHandler={submitSearchHandler} onOpen={props.onOpen}/>
            }


        </Grid>


    )
}

export default SearchDrawer;
