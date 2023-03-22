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
import {useAppDispatch, useAppSelector, userActions} from "../../../store";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";


const styles = {
    searchField: {
        width: {md: 350, lg: 400},
        height: 1,
        fontSize: {xs: 4, sm: "2rem"},
        bgcolor: "#fff",
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
        position: "absolute",
        top: 9,
        left: 10,
        zIndex: 50,
    },

    searchResultsContainer: {
        position: "absolute",
        top: "100%",
        width: 400,
        zIndex: 50,
        p: "1rem",
        border: "1px solid #ccc",
        borderTop: "none",
        bgcolor: "white.main",
        justifyContent: "center",
        alignItems: "center",


    },
    titleInResults: {
        color: "#444",
        fontSize: "1.2rem"
    }
    ,

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


}

const HeaderDesktop: React.FC = () => {

    const router = useRouter()

    const user = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState<string>("")
    const [isWrong, setIsWrong] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [results, setResults] = useState<Array<any>>([])

    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }


    const goToFavorites = async (_) => {
        if (user.username) {
            await router.push({pathname: `/account/${user?.userId}`, query: {tab: 2}})

        } else {

            await router.push("/sign-in")
        }
    }


    const goToCart = async (_) => {
        if (user.username) {
            await router.push({pathname: `/account/${user?.userId}`, query: {tab: 3}})
        } else {

            await router.push("/sign-in")
        }

    }

    const submitSearchHandler = (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            setIsWrong(true)
            setTimeout(() => {
                setIsWrong(false)
            }, 5000)
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


    const closeSearchHandler = useCallback(() => {
        setSearch("")

    }, [])

    const closeButton = <InputAdornment position="end">

    </InputAdornment>

    const searchChangeHandler = (e) => {
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
            }, 800);
        };
    };


    const handleChange = async (value) => {
        setIsLoading(true)
        const res = await axios.post(`/api/products`, {search: value})
        setResults(res.data.products.slice(0, 5));
        setIsLoading(false)
        // console.log(res.data)

    };
    const optimizedFn = useCallback(debounce(handleChange), []);

    /*** end of debouncing ***/



    const goToProductHandler = useCallback((id) => {
        router.push(`/products/${id}`)

    }, [])

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"} mb={30} xs={12}>
            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} xs={12}
                  py={20}>
                <Grid container item md={"auto"} lg={1} pl={10} minHeight={100} maxWidth={100}>
                    <Link href={"/"}>
                        <Image src={"/assets/pictures/logo.png"} alt={"dival-logo"} width={100} height={100}
                        />
                    </Link>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item
                      justifyContent={"center"}
                      alignItems={"flex-start"} md={true} lg={6} xl={7} pr={20} component={"form"}
                      onSubmit={submitSearchHandler}

                >
                    <Grid item xs={12} position={"relative"}>
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
                                                <Search sx={{...styles.searchIcon}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                    // endAdornment: (search.trim() !== "" && closeButton)
                                }}
                            />
                        </Tooltip>
                        <IconButton sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}
                                    onClick={closeSearchHandler}>
                            <Close color={"primary"} fontSize={"large"}/>
                        </IconButton>

                        {search.trim() !== "" &&

                            <Grid item xs={12} sx={styles.searchResultsContainer}>

                                {isLoading ?
                                    <Grid container justifyContent={"center"} alignItems={"center"}>
                                        <CircularProgress color={"primary"} size={45}/>
                                    </Grid> :
                                    <>
                                        <List>
                                            {results.map((result) => {
                                                if (search.trim() !== "" && results.length !== 0) {

                                                    return (
                                                        <ListItem disablePadding key={result._id}>
                                                            <ListItemButton
                                                                onClick={() => goToProductHandler(result._id)}
                                                                sx={{gap: 10, p: 5}}>
                                                                <Image
                                                                    src={`/assets/pictures/products/${result.title?.replaceAll(" ", "-")}.jpg`}
                                                                    alt={result.title}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                <p style={styles.titleInResults}>
                                                                    {result.title}
                                                                </p>

                                                            </ListItemButton>
                                                        </ListItem>


                                                    )
                                                }


                                            })}
                                            {results.length === 0 && search.trim() !== "" && (
                                                <Grid container justifyContent={"center"} alignItems={"center"}>

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
                                        </List>
                                    </>

                                }


                            </Grid>
                        }
                    </Grid>
                </Grid>


                <Grid container item md={"auto"} lg={true} xl={2} justifyContent={"flex-end"}>
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
                                    bgcolor: "#fff"
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
                                    bgcolor: "#fff"
                                }}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Grid>
                <Grid item container md={"auto"} lg={"auto"} xl={2} justifyContent={"flex-end"}>

                    {user?.username === null ?
                        <Link href={"/sign-in"} passHref>
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

                                <MenuItem onClick={() => router.push("/account/" + user?.userId)}>
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
