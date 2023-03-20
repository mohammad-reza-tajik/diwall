import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import React, {useState, useCallback} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


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
        height: "100vh",
        backgroundColor: "#f5f5f5",
        position: "fixed",
        top: 0,
        right: 0,
        width: "100vw",
        px: 10,
        pt: 30,
        justifyContent: "center",
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

    const router = useRouter()
    const [search, setSearch] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<Array<any>>([])
    const [isWrong, setIsWrong] = useState(false)

    const changeHandler = (e) => {
        setSearch(e.target.value)
        optimizedFn(e.target.value)
        if (e.target.value.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)

        } else {
            setIsWrong(false)
        }
    }

    /*** start of debouncing ***/
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };


    const handleChange = async (value) => {
        setIsLoading(true)
        const res = await axios.post(`/api/products`, {search: value})
        setResults(res.data.products.slice(0, 5));
        setIsLoading(false)
        console.log(res.data)

    };
    const optimizedFn = useCallback(debounce(handleChange), []);

    /*** end of debouncing ***/


    const submitSearchHandler = (e) => {
        e.preventDefault();
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)
            return
        }
        setIsWrong(false)
        axios.post(`/api/products`, {search: search}).then(_ => {
            router.push(
                {
                    pathname: `/products`,
                    query: {
                        search,
                        page: 1
                    }

                })
            setSearch("")
        }).catch(err => {
            console.log(err)

        })
        props.onOpen(false)
    }
    const goToProductHandler = useCallback((id) => {
        props.onOpen(false)
        router.push(`/products/${id}`)

    },[])
    return (
        <Grid container item spacing={10} component={"form"} onSubmit={submitSearchHandler} sx={{
            ...styles.searchDrawer,
            transform: props.open ? "translateY(0)" : "translateY(-100%)"
        }}>
            <Grid item xs>
                <Tooltip title={"لطفا عبارتی برای جستجو وارد کنید!"} open={isWrong} placement={"bottom"}
                         arrow>
                    <TextField
                        error={isWrong}
                        fullWidth
                        placeholder={"جستجو ..."}
                        value={search}
                        onChange={changeHandler}
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
            <Grid item xs={12} height={.7}>

                {isLoading ?
                    <Grid container justifyContent={"center"} alignItems={"center"}>
                    <CircularProgress color={"primary"} size={45}/>
                    </Grid> :
                    <>
                        <Typography variant={"h4"} component={"p"} color={"#666"} fontSize={18} sx={{mb:20}}>
                            نتایج جستجو :
                        </Typography>
                        <List>
                            {results.map((result) => {
                                if (search.trim() !== "" && results.length !== 0){

                                return (
                                    <ListItem disablePadding key={result._id}>
                                        <ListItemButton onClick={() => goToProductHandler(result._id)} sx={{gap:10 , p:5}}>
                                                    <Avatar src={result.image} sx={{width: 50, height: 50}}
                                                            alt={result.title}/>
                                                    <Typography variant={"h5"} color={"#444"} sx={{ fontSize:{xs:10,sm:14}}}>
                                                        {result.title}
                                                    </Typography>
                                        </ListItemButton>
                                    </ListItem>



                                )
                                }



                            })}
                            {results.length === 0 && (
                                <Grid container justifyContent={"center"} alignItems={"center"}>

                                <Typography variant={"h5"} color={"#666"} fontSize={16}>
                                نتیجه ای یافت نشد!
                                </Typography>
                                </Grid>
                            )
                            }
                            {results.length !==0 && search.trim() !== "" &&
                            <Button variant={"contained"} onClick={submitSearchHandler} sx={{width:1,fontSize:14,mt:15}}>
                                مشاهده بیشتر
                            </Button>
                            }
                        </List>
                    </>

                }


            </Grid>

        </Grid>


    )
}

export default SearchDrawer;
