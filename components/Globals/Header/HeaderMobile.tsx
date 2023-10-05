import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuDrawer from "./MenuDrawer";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import {enqueueSnackbar} from "notistack";
import SearchDrawer from "./SearchDrawer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HamburgerIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import type {SxProps, Theme} from "@mui/system";

const styles = {
    headerIcon: {
        fontSize: 30,
    },
    headerButton: {
        p: 5,
        borderRadius: 2,
        border: (theme) => `1px solid ${theme.palette.primary.main}`
    },
    logo: {
        width: "5rem",
        height: "3rem",
        fill: "#555"
    },


} satisfies Record<string, SxProps<Theme>>

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const HeaderMobile: React.FC = () => {

    const router = useRouter();

    const user = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false);


    if (typeof window !== "undefined") { // to prevent errors in server side rendering
        const body = document.body
        if (openSearchDrawer || openMenuDrawer) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "scroll"
        }
    }


    /*** menu logic ***/

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }


    return (
        <Grid container py={"1rem"}>
            <Grid container item xs alignItems={"baseline"} gap={"1rem"}>
                <IconButton onClick={() => setOpenMenuDrawer((prevState) => !prevState)} color={"primary"}
                            sx={styles.headerButton}
                            aria-label="open menu drawer">
                    <HamburgerIcon sx={styles.headerIcon}/>
                </IconButton>

                <Link href={"/"}>
                    <svg style={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.4 56.16">
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                                <path
                                    d="M17.28,54.36C6.48,54.36,0,47.52,0,36.36V22.68H11.88v14c0,3.24,1.8,5,6.12,5h2.16c4.68,0,6.48-2.16,6.48-5V0H38.52V36c0,10.08-6.84,18.36-18,18.36Z"/>
                                <path d="M42.84,0H54.72V40H42.84Z"/>
                                <path
                                    d="M89.64,27.36c1.08,0,1.44.36,1.44,6.12,0,6.12-.36,6.48-1.44,6.48H86c-.5,10.59-7.2,16.2-16.49,16.2H59.76L59,43.56H70.2c2.88,0,4-1.08,4-3.6H73.08c-10.8,0-13.32-5-13.32-13,0-7.56,4.68-14,13-14,7.2,0,13.32,4,13.32,14.4ZM73.08,28.44h1.8v-1.8c0-1.8-.72-2.52-2-2.52a1.82,1.82,0,0,0-1.94,2.09C70.92,27.58,71.28,28.44,73.08,28.44Z"/>
                                <path
                                    d="M93.6,27.36a1.11,1.11,0,0,0,1.08-1.08V16.56h11.88v10.8c0,8.28-5,12.6-11.88,12.6h-5c-1.08,0-1.44-.36-1.44-6.12,0-6.12.36-6.48,1.44-6.48Zm14.76,25.2H89.64v-9h18.72Z"/>
                                <path
                                    d="M115.92,14l9-8.64,11.52,14c3.24,4,4,7.06,4,9.72,0,5.91-3.89,10.8-12.24,10.8H110.88l-1.08-12.6h15.12c.72,0,1.08-.36,1.08-.86a2.57,2.57,0,0,0-.72-1.51Z"/>
                            </g>
                        </g>
                    </svg>
                </Link>
            </Grid>

            <Grid container item xs={"auto"} gap={10}>
                <IconButton color={"primary"} onClick={() => setOpenSearchDrawer((prevState) => !prevState)}
                            sx={styles.headerButton}
                            aria-label="open search drawer">
                    <SearchIcon sx={styles.headerIcon}/>
                </IconButton>

                <MenuDrawer setOpenMenuDrawer={setOpenMenuDrawer} openMenuDrawer={openMenuDrawer} iOS={iOS}/>
                <SearchDrawer setOpenSearchDrawer={setOpenSearchDrawer} openSearchDrawer={openSearchDrawer} iOS={iOS}/>

                {
                    user.username === null ?
                        <IconButton component={Link} href={"/auth"} color={"primary"} aria-label="login"
                                    sx={styles.headerButton}>
                            <LoginIcon sx={styles.headerIcon}/>
                        </IconButton> :
                        <>
                            <IconButton aria-label="open user menu" color={"primary"} sx={styles.headerButton}
                                        onClick={(e) => {
                                            setAnchorEl(anchorEl ? null : e.currentTarget)
                                        }}>
                                <PersonIcon sx={styles.headerIcon}/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={closeMenu}
                                onClick={closeMenu}
                                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                            >
                                <MenuItem onClick={() => router.push(`/account/${user?._id}?tab=0`)}>
                                    <ListItemIcon>
                                        <PersonIcon sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15}>
                                        حساب کاربری
                                    </Typography>

                                </MenuItem>
                                <MenuItem onClick={() => router.push(`/account/${user?._id}?tab=1`)}>
                                    <ListItemIcon>
                                        <FavoriteIcon sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15}>
                                        علاقمندی ها
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => router.push(`/account/${user?._id}?tab=2`)}>
                                    <ListItemIcon>
                                        <ShoppingBagIcon sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15}>
                                        سبد خرید
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
    )

}

export default HeaderMobile