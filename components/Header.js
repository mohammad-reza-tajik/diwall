import MainNavigation from "./MainNavigation";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Close, FavoriteBorder, Login, Search, ShoppingBagOutlined} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import {useContext, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import authContext from "../store/auth-context"

const styles = {
    seeAllButton: {
        w: 1,
        justifyContent: "center"
    },
    searchField: {
        width: {xs: .8, md: 400},
        height: 1,
        fontSize: {xs: 4, sm: "2rem"},
        '& .MuiInput-input': {
            borderRadius: 30

        },
        "& .MuiInput-inputMultiline": {
            borderRadius: 30

        }

    },
    searchIcon: {
        fontSize: "2.5rem",
        color: "primary.main",
        mr: -15,
        ml: 10
    },
    closeIcon: {
        color: "primary.main",
        fontSize: "2rem",
        ml: -15,


    },

    searchResultsContainer: {
        position: "absolute",
        top: "100%",
        right: 20,
        width: {xs: .8, md: 400},
        zIndex: 50,
        minHeight: 200,
        maxHeight: 400,
        border: "1px solid #ccc",
        borderTop: "none",
        bgcolor: "white.main",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
        // p:20


    },

    signInButton: {

        width: "20rem",
        height: "4rem",
        borderRadius: 2,
        fontFamily: "dana-demibold",
        mr: "auto",
        fontSize: "1.4rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        }
    },
    listItem: {
        gap: 10,
        p: 0


    },
    list: {
        width: 1,
        height: "auto",
        // maxHeight:400,

    }

    ,
}

const Header = () => {

    const theme = useTheme()
    const authCtx = useContext(authContext)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [isWrong, setIsWrong] = useState(false)
    const [helperText, setHelperText] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchResultsDisplay, setSearchResultsDisplay] = useState("none")
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)

    }

    const submitSearchHandler = (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            setHelperText("لطفا عبارتی برای جستجو وارد کنید")
            return
        }
        setHelperText("")
        setIsWrong(false)
        // setSearchResultsDisplay("flex")
        // setIsLoading(true)
        axios.post(`/api/products`, {search}).then(res => {
            // setSearchResults(res.data)
            setIsLoading(false)
            // router.query.search = search
            router.push(
                {
                    pathname: `/products`,
                    query: {
                        search,
                        page:1
                    }

                })
            setSearch("")
        }).catch(err => {
            setIsLoading(false)
            console.log(err)

        })


    }


    const clearSearchHandler = () => {
        setSearch("")
        setSearchResultsDisplay("none")

    }
    const closeButton = <InputAdornment position="end">
        <IconButton onClick={clearSearchHandler}>
            <Close sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}/>
        </IconButton>
    </InputAdornment>

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"} mb={40}>
            <Grid container item direction={"row"} alignItems={"center"} xs={11}
                  justifySelf={"center"} pt={20}>
                <Grid container item xs={1} minWidth={90} minHeight={90}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={90} height={90}/>
                        </a>
                    </Link>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item justifyContent={"center"}
                      alignItems={"flex-start"} xs={7} pr={20} component={"form"} onSubmit={submitSearchHandler}>
                    <Grid item xs={12}>

                        <TextField
                            error={isWrong}
                            helperText={helperText}
                            placeholder={"جستجو ..."}
                            value={search}
                            onChange={searchChangeHandler}
                            sx={styles.searchField}
                            variant="outlined"
                            size={matchesSM ? "small" : "medium"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton type={"submit"}>
                                            <Search sx={styles.searchIcon}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                endAdornment: (closeButton)
                            }}
                        />
                    </Grid>

                    {/******** handling search results *******/}

                    {<Grid container item sx={{...styles.searchResultsContainer, display: searchResultsDisplay}}>
                        {isLoading ? <CircularProgress color={"primary"} size={45}/> :
                            <List sx={styles.list}>
                                {searchResults.length === 0 &&
                                    <ListItem>
                                        <Typography variant={"h4"} fontSize={20} color={"#666"}>نتیجه ای پیدا
                                            نشد!</Typography>

                                    </ListItem>}
                                {searchResults.length !== 0 && searchResults.map((item) => {
                                    return (
                                        <ListItem button divider sx={styles.listItem} key={item._id}>
                                            <Image src={item.image} width={90} height={90} alt={item.title}/>
                                            <Typography variant={"h4"} fontSize={18} color={"#666"}>
                                                {item.title}
                                            </Typography>
                                        </ListItem>
                                    )
                                })}
                                {!isLoading && searchResults.length !== 0 && <ListItem button sx={styles.seeAllButton}>
                                    <Typography variant={"h4"} fontSize={18} color={"#666"}>مشاهده همه</Typography>
                                </ListItem>
                                }

                            </List>
                        }
                    </Grid>}
                </Grid>
                <Grid container item xs={2} justifyContent={"flex-end"}>
                    <IconButton color={"primary"}>
                        <FavoriteBorder sx={{
                            fontSize: {xs: 40, sm: 50},
                            border: "2px solid #11AE77",
                            borderRadius: "50px",
                            p: ".7rem"
                        }}/>
                    </IconButton>
                    <IconButton color={"primary"}>
                        <ShoppingBagOutlined sx={{
                            fontSize: {xs: 40, sm: 50},
                            border: "2px solid #11AE77",
                            borderRadius: "50px",
                            p: ".7rem"
                        }}/>
                    </IconButton>

                </Grid>

                <Grid item container xs={2} justifyContent={"flex-end"}>
                    {!matchesMD && !authCtx.isLoggedIn ? <Link href={"/sign-in"} passHref><Button
                            variant={"contained"}
                            color={"primary"}
                            startIcon={
                                <Login sx={{fontSize: 10, ml: 5, transform: "rotateZ(180deg)"}}/>
                                }
                            sx={styles.signInButton}
                        > ورود / ثبت نام </Button>
                        </Link>
                        :
                        <Link href={`/user/${authCtx.user.username}`} passHref><Button
                            variant={"contained"}
                            color={"primary"}
                            startIcon={""}
                            sx={styles.signInButton}
                        >{authCtx.user.username}</Button>
                        </Link>

                    }

                </Grid>

            </Grid>
            <MainNavigation/>
        </Grid>

    )

}

export default Header