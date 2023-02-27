import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import React, {useRef, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";


const styles = {
    searchField: {
        width: {xs: 1, sm: .6, md: .6},
        height: 1,
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

    searchDrawer:{
        height: 100,
        backgroundColor:"#f8f8f8",
        position:"fixed",
        top:0,
        right:0,
        width: "100vw",
        px: 20,
        justifyContent: "center",
        alignItems: "center",
        transition: "all .4s",
        zIndex:1000


    }


}

interface Props {
    onOpen:any;
    open:boolean;
}
const SearchDrawer: React.FC<Props> = (props) => {

    const router = useRouter()
    const searchRef = useRef<HTMLInputElement>()
    const [isWrong, setIsWrong] = useState(false)


    const submitSearchHandler = (e) => {
        e.preventDefault();
        if (searchRef && searchRef.current?.value.trim() === "") {
            setIsWrong(true)
            return
        }
        setIsWrong(false)
        axios.post(`/api/products`, {search: searchRef.current.value}).then(_ => {
            router.push(
                {
                    pathname: `/products`,
                    query: {
                        search: searchRef.current.value,
                        page: 1
                    }

                })
            searchRef.current.value = ""
        }).catch(err => {
            console.log(err)

        })
        props.onOpen(false)


    }
    return (
        <Grid container item spacing={10} component={"form"} onSubmit={submitSearchHandler} sx={{
                ...styles.searchDrawer,
                transform: props.open ? "translateY(0)" : "translateY(-100%)" }}>
            <Grid item xs>
                <Tooltip title={"لطفا عبارتی برای جستجو وارد کنید!"} open={isWrong} placement={"bottom"}
                         arrow>
                    <TextField
                        error={isWrong}
                        fullWidth
                        placeholder={"جستجو ..."}
                        inputRef={searchRef}
                        sx={styles.searchField}
                        variant="outlined"
                        size={"medium"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton type={"submit"}>
                                        <Search sx={styles.searchIcon}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            // endAdornment: (closeButton)
                        }}
                    />
                </Tooltip>
            </Grid>
            <Grid item xs={"auto"}>
                <IconButton onClick={() => props.onOpen(false)}>
                    <Close sx={styles.closeIcon}/>
                </IconButton>

            </Grid>

        </Grid>


    )
}

export default SearchDrawer;
