import MainNavigation from "../MainNavigation";


import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"
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
import React, {useState} from "react";

import {useAppDispatch, useAppSelector, userActions , snackbarActions} from "@/store";
import SearchResults from "../SearchResults";
import useSearch from "@/hooks/useSearch";
import type {SxProps} from "@mui/system";


const styles : Record<string, SxProps>   = {
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

    loginButton: {

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

    const user = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const {router , search , submitSearchHandler , searchChangeHandler , isWrong , results , isLoading , closeSearchHandlerDesktop} = useSearch("desktop")





    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }


    const goToFavorites = async () => {
        if (user.username) {
            await router.push(`/account/${user?._id}?tab=2`)

        } else {

            await router.push("/auth")
        }
    }


    const goToCart = async () => {
        if (user.username) {
            await router.push(`/account/${user?._id}?tab=3`)
        } else {
            await router.push("/auth")
        }

    }



    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"} mb={30} xs={12}>
            <Grid container item direction={"row"} justifyContent={"center"} alignItems={"center"} xs={12}
                  py={20}>
                <Box minHeight={100} maxWidth={100} component={Link} href={"/"}>
                        <Image src={"/assets/pictures/logo.png"} alt={"diwall-logo"} width={100} height={100}
                        />
                </Box>
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
                                            <IconButton type={"submit"} aria-label="search button">
                                                <Search sx={{...styles.searchIcon}}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Tooltip>
                        <IconButton aria-label="clear search field" sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}
                                    onClick={closeSearchHandlerDesktop}>
                            <Close color={"primary"} fontSize={"large"}/>
                        </IconButton>

                        {
                            search.trim().length >= 3 &&
                                <SearchResults isLoading={isLoading} results={results} search={search} submitSearchHandler={submitSearchHandler} onClose={closeSearchHandlerDesktop} />
                        }
                    </Grid>
                </Grid>


                <Grid container item md={"auto"} lg={true} xl={2} justifyContent={"flex-end"}>
                    <Tooltip title={"کالاهای مورد علاقه شما"} arrow enterDelay={1000} leaveDelay={0}>
                        <Badge showZero max={99} badgeContent={user?.wishlist.length || 0} color="primary"
                               overlap="circular"
                               sx={{"& .MuiBadge-badge": {fontSize: 16, height: 30, minWidth: 30, borderRadius: 30}}}
                         >
                            <IconButton color={"primary"} onClick={goToFavorites} aria-label="go to wishlist">
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
                            <IconButton color={"primary"} onClick={goToCart} aria-label="go to cart">
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
                    {
                        user?.username === null ?
                            <Button
                                component={Link}
                                href={"/auth"}
                                variant={"contained"}
                                color={"primary"}
                                aria-label="login/signup"
                                startIcon={
                                    <Login sx={{fontSize: 10, ml: 5, transform: "rotateZ(180deg)"}}/>
                                }
                                sx={styles.loginButton}
                            > ورود / ثبت نام </Button>

                        :
                        <>
                            <Button
                                variant={"contained"}
                                aria-label="show menu"
                                onClick={(e) => {
                                    setAnchorEl(anchorEl ? null : e.currentTarget)
                                }}
                                color={"primary"}
                                startIcon={""}
                                sx={styles.loginButton}> {user?.username} </Button>

                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={closeMenu}
                                onClick={closeMenu}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >

                                <MenuItem onClick={() => router.push(`/account/${user?._id}?tab=1`)}>
                                    <ListItemIcon>
                                        <Person sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}> مشاهده
                                        پروفایل
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    dispatch(userActions.logout());
                                    dispatch(snackbarActions.openSnackbar({message :"با موفقیت از حساب خود خارج شدید" , status : "info"}))

                                }}>
                                    <ListItemIcon>
                                        <Logout sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                        خروج از حساب کاربری
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </>

                    }
                </Grid>

            </Grid>
            <MainNavigation/>
        </Grid>
    )
}
export default HeaderDesktop
