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
import {enqueueSnackbar} from "notistack";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import SearchResults from "../SearchResults";
import useSearch from "@/hooks/useSearch";
import type {SxProps, Theme} from "@mui/system";

const styles = {
    searchField: {
        width: {md: 350, lg: 400},
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
    },
    loginButton: {
        width: {xs: 160, lg: 200},
        height: "4rem",
        borderRadius: 2,
        fontFamily: "dana-bold",
        mr: "auto",
        fontSize: "1.4rem",
        gap: 10,
        color: "white.main",
    },
    iconButtons: {
        fontSize: {xs: 40, sm: 45},
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        p: ".7rem",
        bgcolor: "white.main"
    }

} satisfies Record<string, SxProps<Theme>>

const searchInputAdornment = (
    <InputAdornment position="start">
        <IconButton type={"submit"} aria-label="search button">
            <SearchIcon sx={styles.searchIcon}/>
        </IconButton>
    </InputAdornment>
)

const HeaderDesktop: React.FC = () => {

    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const {
        search,
        submitSearchHandler,
        searchChangeHandler,
        isWrong,
        results,
        isLoading,
        closeSearchHandlerDesktop
    } = useSearch("desktop")

    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Grid container component={"header"} justifyContent={"center"} mb={30}>
            <Grid container item justifyContent={"center"} alignItems={"center"} xs={12}
                  py={20}>
                <Grid width={100} height={100} component={Link} href={"/"}>
                    <Image src={"/assets/pictures/logo.png"} alt={"diwall-logo"} width={100} height={100}/>
                </Grid>
                <Grid position={"relative"} container direction={"column"} item
                      justifyContent={"center"}
                      alignItems={"flex-start"} md lg={6} xl={7} pr={20} component={"form"}
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
                                    startAdornment: searchInputAdornment,
                                }}
                            />
                        </Tooltip>
                        <IconButton aria-label="clear search field"
                                    sx={{...styles.closeIcon, opacity: search.trim() === "" ? 0 : 1}}
                                    onClick={closeSearchHandlerDesktop}>
                            <CloseIcon color={"primary"} fontSize={"large"}/>
                        </IconButton>

                        {
                            search.trim().length >= 3 &&
                            <SearchResults isLoading={isLoading} results={results} search={search}
                                           submitSearchHandler={submitSearchHandler} closeSearch={closeSearchHandlerDesktop}/>
                        }
                    </Grid>
                </Grid>


                <Grid container item md={"auto"} lg xl={2} justifyContent={"flex-end"}>
                    <Tooltip title={"کالاهای مورد علاقه شما"} arrow>
                        <Badge showZero max={99} badgeContent={user?.wishlist.length || 0} color="primary"
                               overlap="circular">
                            <IconButton color={"primary"} component={Link} href={user.username ? `/account/${user?._id}?tab=1` : "/auth"} aria-label="go to wishlist">
                                <FavoriteBorderIcon sx={styles.iconButtons}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title={"سبد خرید شما"} arrow>
                        <Badge showZero max={99} badgeContent={user?.cart.length || 0} color="primary"
                               overlap="circular">
                            <IconButton color={"primary"} component={Link} href={user.username ? `/account/${user?._id}?tab=2` : "/auth"} aria-label="go to cart">
                                <ShoppingBagOutlinedIcon sx={styles.iconButtons}/>
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
                                    <LoginIcon sx={{fontSize: 10, ml: 5, transform: "rotateZ(180deg)"}}/>
                                }
                                sx={styles.loginButton}
                            > ورود / ثبت نام </Button> :
                            <>
                                <Button
                                    variant={"contained"}
                                    aria-label="show menu"
                                    onClick={(e) => {
                                        setAnchorEl(anchorEl ? null : e.currentTarget)
                                    }}
                                    color={"primary"}
                                    startIcon={""}
                                    sx={styles.loginButton}>{user?.username}</Button>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={closeMenu}
                                    onClick={closeMenu}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem component={Link} href={`/account/${user?._id}?tab=0`}>
                                        <ListItemIcon>
                                            <PersonIcon sx={{fontSize: 25}} color={"primary"}/>
                                        </ListItemIcon>
                                        <Typography variant={"caption"} fontSize={15}>
                                            حساب کاربری
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        dispatch(userActions.logout());
                                        enqueueSnackbar("با موفقیت از حساب خود خارج شدید", {
                                            variant: "info",
                                        });

                                    }}>
                                        <ListItemIcon>
                                            <LogoutIcon sx={{fontSize: 25}} color={"primary"}/>
                                        </ListItemIcon>
                                        <Typography variant={"caption"} fontSize={15}>
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
