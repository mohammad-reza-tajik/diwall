import MainNavigation from "./MainNavigation";
import SearchResults from "./SearchResults";
import {Button, Grid, IconButton, InputAdornment, TextField, useMediaQuery, useTheme} from "@mui/material";
import {FavoriteBorder, Login, Search, ShoppingBagOutlined} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import axios from "axios";

const styles = {
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
        color: "primary.main"
    },

    searchResultsContainer:{
        position:"absolute",
        top:"100%",
        right:20,
        width: {xs: .8, md: 400},
        zIndex:50,
        // gap: 5,
        // pr:10,
        // pt:5,
        border: "1px solid #ccc",
        borderTop:"none",
        bgcolor:"white.main"

    },

    signInButton: {

        width: "20rem",
        height: "4rem",
        borderRadius: 2,
        fontFamily:"dana-demibold",
        mr: "auto",
        fontSize: "1.4rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        }

    },
}

const Header = () => {

    const theme = useTheme()
    const [isLoading,setIsLoading] = useState(false)
    const [search,setSearch] = useState("")
    const [searchResults,setSearchResults] = useState([])
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)

    }

    const submitSearchHandler = (e) => {
        e.preventDefault()
        axios.post("/api/search",{search}).then(res => {
            setSearchResults(res.data)
            console.log(res.data)
        }).catch(err => console.log(err))

    }

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"}>

            <Grid container item direction={"row"} alignItems={"center"} xs={11}
                  justifySelf={"center"} pt={20}>
                <Grid container item xs={1} minWidth={90} minHeight={90}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={90} height={90}/>
                        </a>
                    </Link>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item justifyContent={"center"} alignItems={"flex-start"} xs={7} pr={20} component={"form"} onSubmit={submitSearchHandler}>
                       <Grid item xs={12}>

                    <TextField
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
                            }}
                        />
                       </Grid>
                    <Grid container item sx={styles.searchResultsContainer}>
                        <SearchResults results={searchResults} />
                    </Grid>
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
                    {!matchesMD && <Link href={"/sign-in"} passHref><Button
                        variant={"contained"}
                        color={"primary"}
                        startIcon={<Login sx={{fontSize: 10, ml: 5,transform:"rotateZ(180deg)"}}/>
                        }
                        sx={styles.signInButton}
                    >
                        ورود / ثبت نام
                    </Button>
                    </Link>}
                    {matchesMD &&
                        <Link href={"/sign-in"} passHref>
                            <IconButton>
                                <Login sx={{
                                    color: "white",
                                    fontSize: {xs: 30, sm: 40},
                                    transform: "rotate(180deg)"
                                }}/>
                            </IconButton>
                        </Link>
                    }
                </Grid>
            </Grid>
            <MainNavigation/>
        </Grid>

    )

}

export default Header