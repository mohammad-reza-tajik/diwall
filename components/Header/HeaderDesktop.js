import MainNavigation from "../MainNavigation";
import {
    Badge,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    ListItemIcon,
    Menu,
    MenuItem,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    Close,
    FavoriteBorder,
    Login,
    Logout,
    Person,
    PersonOutlined,
    Search,
    ShoppingBagOutlined
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import {Fragment, useContext, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import authContext from "../../context/auth-context"
import loadingContext from "../../context/loading-context";

const styles = {
    seeAllButton: {
        w: 1,
        justifyContent: "center"
    },
    searchField: {
        width: {md: 400},
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
        ml: 10,
        "& *" : {
            mr: -15,
            ml: 10,

        }

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

        width: {xs:160,lg:200},
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
    signInPopup: {
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
}

const HeaderDesktop = () => {

    const theme = useTheme()
    const router = useRouter()

    const [search, setSearch] = useState("")
    const [isWrong, setIsWrong] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchResultsDisplay, setSearchResultsDisplay] = useState("none")

    // const {isLoading, setIsLoading} = useContext(loadingContext)

    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matches1277 = useMediaQuery('(max-width:1277px)')
    const matches1000 = useMediaQuery('(max-width:1000px)')
    // const matchesXS = useMediaQuery(index.breakpoints.up("xs"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))


    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    //*** search form logic ***//

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)

    }

    const goToFavorites = async (e) => {
        if (authCtx.isAuthenticated) {
            await router.push({pathname: `/profile/${authCtx.user?.userId}`, query: {tab: 2}})

        } else
            await router.push("/sign-in")
    }


    const goToCart = async (e) => {
        if (authCtx.isAuthenticated) {
            await router.push({pathname: `/profile/${authCtx.user?.userId}`, query: {tab: 3}})

        } else
            await router.push("/sign-in")

    }


    const submitSearchHandler = async (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            return
        }
        setIsWrong(false)
        // setSearchResultsDisplay("flex")
        // setIsLoading(true)
        axios.post(`/api/products`, {search}).then(res => {
            // setSearchResults(res.data)
            // loadingCtx.loading()
            // router.query.search = search
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
            // setIsLoading(true)
            console.log(err)

        })


    }


    const clearSearchHandler = () => {
        setSearch("")
        setSearchResultsDisplay("none")

    }
    const authCtx = useContext(authContext)
    // console.log(authCtx)
    const closeButton = <InputAdornment position="end">
        <IconButton onClick={clearSearchHandler}>
            <Close sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}/>
        </IconButton>
    </InputAdornment>

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"} mb={30} xs={12}>
            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} xs={12}
                   py={20}>
                <Grid container item xs={"auto"} pl={10}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={80}
                                   height={80}/>
                        </a>
                    </Link>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item
                      justifyContent={"center"}
                      alignItems={"flex-start"} xs={matches1000 ? true : 7}  pr={20} component={"form"}
                      onSubmit={submitSearchHandler}

                >
                    <Grid item xs={12}>
                        <Tooltip title={"لطفا عبارتی برای جستجو وارد کنید!"} open={isWrong} placement={"bottom-end"}
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
                                            <IconButton type={"submit"}>
                                                <Search sx={styles.searchIcon}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (closeButton)
                                }}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>



                <Grid container item xs={matches1277 ? "auto" : 2} justifyContent={"flex-end"}>
                    <Tooltip title={"کالاهای مورد علاقه شما"} arrow enterDelay={1000} leaveDelay={0}>
                        <Badge showZero max={99} badgeContent={authCtx.user?.favoriteList.length || 0} color="primary"
                               overlap="circular"
                               sx={{"& .MuiBadge-badge": {fontSize: 16, height: 30, minWidth: 30, borderRadius: 30}}}
                        >
                            <IconButton color={"primary"} onClick={goToFavorites}>
                                <FavoriteBorder sx={{
                                    fontSize: {xs: 40, sm: 50},
                                    border: "2px solid #11AE77",
                                    borderRadius: "50px",
                                    p: ".7rem"
                                }}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title={"سبد خرید شما"} arrow enterDelay={1000}>
                        <Badge showZero max={99} badgeContent={authCtx.user?.cart.length || 0} color="primary"
                               overlap="circular"
                               sx={{"& .MuiBadge-badge": {fontSize: 16, height: 30, minWidth: 30, borderRadius: 30}}}>
                            <IconButton color={"primary"} onClick={goToCart}>
                                <ShoppingBagOutlined sx={{
                                    fontSize: {xs: 40, sm: 50},
                                    border: "2px solid #11AE77",
                                    borderRadius: "50px",
                                    p: ".7rem"
                                }}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Grid>
                <Grid item container xs={matches1000 ? "auto" :true} justifyContent={"flex-end"}>

                    {!authCtx.isAuthenticated ? <Link href={"/sign-in"} passHref>
                                <Button
                                    variant={"contained"}
                                    color={"primary"}
                                    startIcon={
                                        <Login sx={{fontSize: 10, ml: 5, transform: "rotateZ(180deg)"}}/>
                                    }
                                    sx={styles.signInButton}
                                > ورود / ثبت نام </Button>
                            </Link>
                            :
                            <Fragment>
                                <Button
                                    variant={"contained"}
                                    onClick={(e) => {
                                        setAnchorEl(anchorEl ? null : e.currentTarget)
                                    }}
                                    color={"primary"}
                                    startIcon={""}
                                    sx={styles.signInButton}> {authCtx.user?.username} </Button>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    // disableScrollLock={true}     // to prevent adding padding to the body on opening the menu
                                    onClose={closeMenu}
                                    onClick={closeMenu}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,

                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem onClick={() => router.push("/profile/" + authCtx.user?.userId)}>
                                        <ListItemIcon>
                                            <Person sx={{fontSize: 25}} color={"primary"}/>
                                        </ListItemIcon>
                                        <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}> مشاهده
                                            پروفایل
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => authCtx.logout()}>
                                        <ListItemIcon>
                                            <Logout sx={{fontSize: 25}} color={"primary"}/>
                                        </ListItemIcon>
                                        <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                            خروج از حساب کاربری
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Fragment>

                    }
                </Grid>

            </Grid>
            <MainNavigation/>
        </Grid>

    )

}

export default HeaderDesktop


{/******** handling search results *******/}

{/*{<Grid container item sx={{...styles.searchResultsContainer, display: searchResultsDisplay}}>*/}
{/*    {isLoading ? <CircularProgress color={"primary"} size={45}/> :*/}
{/*        <List sx={styles.list}>*/}
{/*            {searchResults.length === 0 &&*/}
{/*                <ListItem>*/}
{/*                    <Typography variant={"h4"} fontSize={20} color={"#666"}>نتیجه ای پیدا*/}
{/*                        نشد!</Typography>*/}

{/*                </ListItem>}*/}
{/*            {searchResults.length !== 0 && searchResults.map((item) => {*/}
{/*                return (*/}
{/*                    <ListItem button divider sx={styles.listItem} key={item._id}>*/}
{/*                        <Image src={item.image} width={90} height={90} alt={item.title}/>*/}
{/*                        <Typography variant={"h4"} fontSize={18} color={"#666"}>*/}
{/*                            {item.title}*/}
{/*                        </Typography>*/}
{/*                    </ListItem>*/}
{/*                )*/}
{/*            })}*/}
{/*            {!isLoading && searchResults.length !== 0 && <ListItem button sx={styles.seeAllButton}>*/}
{/*                <Typography variant={"h4"} fontSize={18} color={"#666"}>مشاهده همه</Typography>*/}
{/*            </ListItem>*/}
{/*            }*/}

{/*        </List>*/}
{/*    }*/}
{/*</Grid>}*/}