import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import {useTheme} from "@mui/material/styles";

import Close from "@mui/icons-material/Close";
import Favorite from "@mui/icons-material/Favorite";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Hamburger from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Search from "@mui/icons-material/Search";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

import React, {Fragment, useRef, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image"
import axios from "axios";
import {useAppDispatch, useAppSelector, userActions} from "../../store";


const styles = {

    headerIcon: {
        fontSize: {xs: 35, md: 50},
        ml: -10,
    },
    seeAllButton: {
        w: 1,
        justifyContent: "center"
    },
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
    backDrop: {
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        px: 20,
        overflow: "hidden"
    }


}


const HeaderMobile: React.FC = () => {

    const router = useRouter()
    const user = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const searchRef = useRef<HTMLInputElement>()

    const theme = useTheme()
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    const [isWrong, setIsWrong] = useState(false)

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false)

    // const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    const menuItemsHandler = ( url:string ) => {
        setOpenMenuDrawer(false)
        router.push(url)

    }

    const submitSearchHandler = (e) => {
        e.preventDefault();
        if (searchRef && searchRef.current?.value.trim() === "") {
            setIsWrong(true)
            return
        }
        setIsWrong(false)
        setOpenSearchDrawer(false)
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


    }




    return (
        <Grid container item xs={12} >

            <Grid container item xs={7} alignItems={"center"} spacing={10}>
                <Grid container item xs={"auto"}>

                    <Drawer
                        // the following props is for fixing drawer in rtl languages

                                     anchor={"left"} PaperProps={{
                        sx: {
                            left: 'unset !important',
                            right: '0 !important'
                        }
                    }} open={openMenuDrawer}
                                     onClose={() => setOpenMenuDrawer(false)}>
                        <Grid container item xs={12} width={matchesSM ? "75vw" : "50vw"} p={20}>


                            <List sx={{width: 1}}>
                                <ListItem sx={{mb: 20}} onClick={() => menuItemsHandler("/")}>
                                    <ListItemIcon sx={{fontSize: 20,cursor:"pointer"}}  >
                                                <Image src={"/assets/pictures/logo-500.png"} alt={"dival-logo"}
                                                       width={100}
                                                       height={100}/>
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem onClick={() => menuItemsHandler("/")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            صفحه نخست
                                        </Typography>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={() => menuItemsHandler("/products")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            جدیدترین محصولات
                                        </Typography>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={() => menuItemsHandler("/products?sortBy=2")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            پرفروش ترین محصولات
                                        </Typography>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={() => menuItemsHandler("/products?sortBy=3")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            محبوب ترین محصولات
                                        </Typography>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={() => menuItemsHandler("/about")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            درباره ما
                                        </Typography>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>

                                <ListItem onClick={() => menuItemsHandler("/collaboration")}>
                                        <Typography sx={{cursor: "pointer"}} variant={"subtitle1"} fontSize={14}>
                                            همکاری با ما
                                        </Typography>
                                </ListItem>

                            </List>


                        </Grid>
                    </Drawer>
                    <IconButton onClick={() => setOpenMenuDrawer(!openMenuDrawer)} color={"primary"} sx={{mr: -10}}>
                        <Hamburger sx={styles.headerIcon}/>
                    </IconButton>
                </Grid>

                <Grid container item xs={"auto"} position={"relative"} top={3}>
                    <Link href={"/"} passHref>
                        <Typography className={"pointer"} variant={"caption"} fontFamily={"dana-black"}
                                    color={"primary"} fontSize={25}>
                            Dival
                        </Typography>
                    </Link>
                </Grid>
            </Grid>


            <Grid container item xs={5} justifyContent={"flex-end"}>
                <IconButton color={"primary"} onClick={() => setOpenSearchDrawer(!openSearchDrawer)}>
                    <Search sx={styles.headerIcon}/>
                </IconButton>
                <Drawer anchor={"top"} open={openSearchDrawer}
                                 onClose={() => setOpenSearchDrawer(false)}>
                    <Grid container height={100} item spacing={10} sx={styles.backDrop} component={"form"} onSubmit={submitSearchHandler}>
                        <Grid item xs >
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
                            <IconButton onClick={() => setOpenSearchDrawer(false)}>
                                <Close sx={styles.closeIcon}/>
                            </IconButton>

                        </Grid>


                    </Grid>
                </Drawer>
                {
                    user.username === null ?

                        <Link href={"/sign-in"} passHref>
                            <IconButton color={"primary"}>
                                <Login sx={styles.headerIcon}/>
                            </IconButton>
                        </Link>


                        :
                        <Fragment>


                            <IconButton color={"primary"} onClick={(e) => {
                                setAnchorEl(anchorEl ? null : e.currentTarget)
                            }}>
                                <Person sx={styles.headerIcon}/>
                            </IconButton>
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
                                <MenuItem onClick={() => router.push("/profile/" + user?.userId + "?tab=2")}>
                                    <ListItemIcon>
                                        <Favorite sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                        علاقمندی ها
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => router.push("/profile/" + user?.userId + "?tab=3")}>
                                    <ListItemIcon>
                                        <ShoppingBag sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                        سبد خرید
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(userActions.logout());
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
    )

}

export default HeaderMobile