import MainNavigation from "../MainNavigation";


import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import Close from "@mui/icons-material/Close";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Search from "@mui/icons-material/Search";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

import Image from "next/image";
import Link from "next/link";
import React, {Fragment, useCallback, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector, userActions} from "../../store";


const styles = {
    seeAllButton: {
        w: 1,
        justifyContent: "center"
    },
    searchField: {
        width: {md: 400},
        height: 1,
        fontSize: {xs: 4, sm: "2rem"},
        bgcolor:"#fff",
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


    },

    signInButton: {

        width: {xs: 160, lg: 200},
        height: "4rem",
        borderRadius: 2,
        fontFamily: "dana-bold",
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

    }
}

const HeaderDesktop: React.FC = () => {

    const router = useRouter()
    const user = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState("")
    const [isWrong, setIsWrong] = useState(false)

    const matches1355 = useMediaQuery('(max-width:1355px)')
    const matches1277 = useMediaQuery('(max-width:1277px)')
    const matches1057 = useMediaQuery('(max-width:1057px)')


    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    //*** search form logic ***//

    const searchChangeHandler = (e) => {
        setSearch(e.target.value)
        // if (e.target.value === "")

    }

    const goToFavorites = async (_) => {
        if (user.username) {
            await router.push({pathname: `/profile/${user?.userId}`, query: {tab: 2}})

        } else {

            await router.push("/sign-in")
        }
    }


    const goToCart = async (_) => {
        if (user.username) {
            await router.push({pathname: `/profile/${user?.userId}`, query: {tab: 3}})
        } else {

            await router.push("/sign-in")
        }

    }

    const submitSearchHandler = async (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(()=> {setIsWrong(false)},5000)
            return
        }
        setIsWrong(false)
        axios.post(`/api/products`, {search}).then(_ => {
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
    }


    const clearSearchHandler = useCallback(() => {
        setSearch("")
    }, [])

    const closeButton = <InputAdornment position="end">
        <IconButton onClick={clearSearchHandler}>
            <Close sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}/>
        </IconButton>
    </InputAdornment>

    const searchIconFix = {
        mr : search.trim() !== "" && -15,
        ml: search.trim() !== "" && 10,
        "& *": {
            mr: search.trim() !== "" && -15,
            ml: search.trim() !== "" && 10,

        }

    }

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"} mb={30} xs={12}>
            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} xs={12}
                  py={20}>
                <Grid container item xs={"auto"} pl={10}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo.png"} alt={"dival-logo"} width={100}
                                   height={100}/>
                        </a>
                    </Link>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item
                      justifyContent={"center"}
                      alignItems={"flex-start"} xs={matches1057 ? true : 7} pr={20} component={"form"}
                      onSubmit={submitSearchHandler}

                >
                    <Grid item xs={12}>
                        <Tooltip title={"لطفا عبارتی برای جستجو وارد کنید!"} open={isWrong} placement={"bottom-end"}
                                 arrow >

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
                                                <Search sx={{...styles.searchIcon,...searchIconFix}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (search.trim() !== "" && closeButton)
                                }}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>


                <Grid container item xs={matches1355 ? "auto" : 2} justifyContent={"flex-end"}>
                    <Tooltip title={"کالاهای مورد علاقه شما"} arrow enterDelay={1000} leaveDelay={0}>
                        <Badge showZero max={99} badgeContent={user?.favoriteList.length || 0} color="primary"
                               overlap="circular"
                               sx={{"& .MuiBadge-badge": {fontSize: 16, height: 30, minWidth: 30, borderRadius: 30}}}
                        >
                            <IconButton color={"primary"} onClick={goToFavorites}>
                                <FavoriteBorder sx={{
                                    fontSize: {xs: 40, sm: 50},
                                    border: "2px solid #11AE77",
                                    borderRadius: "50px",
                                    p: ".7rem",
                                    bgcolor:"#fff"
                                }}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title={"سبد خرید شما"} arrow enterDelay={1000}>
                        <Badge showZero max={99} badgeContent={user?.cart.length || 0} color="primary"
                               overlap="circular"
                               sx={{"& .MuiBadge-badge": {fontSize: 16, height: 30, minWidth: 30, borderRadius: 30}}}>
                            <IconButton color={"primary"} onClick={goToCart}>
                                <ShoppingBagOutlined sx={{
                                    fontSize: {xs: 40, sm: 50},
                                    border: "2px solid #11AE77",
                                    borderRadius: "50px",
                                    p: ".7rem",
                                    bgcolor:"#fff"
                                }}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Grid>
                <Grid item container xs={matches1057 ? "auto" : true} justifyContent={"flex-end"}>

                    {user?.username === null ? <Link href={"/sign-in"} passHref>
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
                                sx={styles.signInButton}> {user?.username} </Button>

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

                                <MenuItem onClick={() => router.push("/profile/" + user?.userId)}>
                                    <ListItemIcon>
                                        <Person sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}> مشاهده
                                        پروفایل
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(userActions.logout())
                                }}>
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
