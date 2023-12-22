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
import {useState} from "react";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import SearchResults from "../SearchResults";
import useSearch from "@/hooks/useSearch";
import type {SxProps, Theme} from "@mui/material/styles";

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
    loginButton: {
        width: {md: 180, lg: 200},
        height: "4rem",
        borderRadius: 1,
        fontFamily: "dana-bold",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontSize: "1.4rem",
        gap: 10,
        color: "white.main",
    },
    iconButtons: {
        fontSize: {xs: 40, sm: 45},
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        borderRadius: 2,
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

function HeaderDesktop() {

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const {
        search,
        submitSearchHandler,
        searchChangeHandler,
        isWrong,
        results,
        isLoading,
        closeSearchHandlerDesktop
    } = useSearch("desktop");

    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Grid container py={"3rem"} gap={"1rem"}>
            <Grid container item xs alignItems={"center"} gap={"1rem"}>
                <Grid width={100} height={100} component={Link} href={"/"}>
                    <Image src={"/assets/pictures/logo.png"} alt={"diwall-logo"} width={100} height={100}/>
                </Grid>
                <Grid container item md={"auto"} component={"form"}
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

                        <Grid container item xs={12} position={"absolute"} right={0} top={"100%"} zIndex={50}>
                            {
                                search.trim().length >= 3 &&
                                <SearchResults isLoading={isLoading} results={results} search={search}
                                               submitSearchHandler={submitSearchHandler}
                                               closeSearch={closeSearchHandlerDesktop}/>
                            }
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container item xs={"auto"} alignItems={"center"} gap={"1rem"}>
                <Grid item md={"auto"}>
                    <Tooltip title={"کالاهای مورد علاقه شما"} arrow>
                        <Badge showZero max={99} badgeContent={user?.wishlist.length || 0} color="primary"
                               overlap="circular">
                            <IconButton color={"primary"} component={Link}
                                        href={user.username ? `/account/${user?._id}?tab=1` : "/auth"}
                                        aria-label="go to wishlist">
                                <FavoriteBorderIcon sx={styles.iconButtons}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                    <Tooltip title={"سبد خرید شما"} arrow>
                        <Badge showZero max={99} badgeContent={user?.cart.length || 0} color="primary"
                               overlap="circular">
                            <IconButton color={"primary"} component={Link}
                                        href={user.username ? `/account/${user?._id}?tab=2` : "/auth"}
                                        aria-label="go to cart">
                                <ShoppingBagOutlinedIcon sx={styles.iconButtons}/>
                            </IconButton>
                        </Badge>
                    </Tooltip>
                </Grid>
                <Grid item md={"auto"}>
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
