import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import SearchResults from "../SearchResults";
import useSearch from "@/hooks/useSearch";
import type {SxProps} from "@mui/system";


const styles = {
    searchField: {
        width: 1,
    },
    searchIcon: {
        fontSize: 25,
        color: "primary.main",
    },
    closeIcon: {
        color: "white.main",
        bgcolor: "primary.main",
        borderRadius: 1,
        p:"1.5rem",
        height: 54,
        width: 54
    },
    searchDrawer: {
        minHeight: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems:"center",
        px: "1rem",
        py: "5rem",
        gap: "1rem"

    }

} satisfies Record<string, SxProps>

interface Props {
    setOpenSearchDrawer: (open: boolean) => void;
    openSearchDrawer: boolean;
    iOS : boolean;
}

const SearchDrawer: React.FC<Props> = ({setOpenSearchDrawer , openSearchDrawer , iOS}) => {

    const {search, isWrong, submitSearchHandler, searchChangeHandler, results, isLoading , closeSearchHandlerMobile} = useSearch("mobile", setOpenSearchDrawer);


    return (
        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} anchor={"top"} open={openSearchDrawer} onClose={closeSearchHandlerMobile} onOpen={() => setOpenSearchDrawer(true)}>
        <Grid container component={"form"} onSubmit={submitSearchHandler} sx={styles.searchDrawer}>
            <Grid container item xs={12} sm={10} justifyContent={"space-between"} alignItems={"center"} gap={"1rem"}>
                <Grid item xs>
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
                                            <SearchIcon sx={styles.searchIcon}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={"auto"}>
                    <IconButton onClick={closeSearchHandlerMobile} aria-label="close search drawer" sx={{p:0}}>
                        <CloseIcon sx={styles.closeIcon}/>
                    </IconButton>
                </Grid>
            </Grid>

            {
                search.trim().length >= 3 &&
                <SearchResults isLoading={isLoading} results={results} search={search}
                               submitSearchHandler={submitSearchHandler} closeSearch={closeSearchHandlerMobile}/>
            }


        </Grid>

        </SwipeableDrawer>

    )
}

export default SearchDrawer;
