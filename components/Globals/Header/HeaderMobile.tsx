import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuDrawer from "./MenuDrawer";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Favorite from "@mui/icons-material/Favorite";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Hamburger from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import Search from "@mui/icons-material/Search";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useAppDispatch, useAppSelector, userActions} from "@/store";
import BackDrop from "./BackDrop";
import SearchDrawer from "./SearchDrawer";
import type {SxProps} from "@mui/system";
import {enqueueSnackbar} from "notistack";

const styles = {

    headerIcon: {
        fontSize: 35,
    },
    headerButton: {
        p: 0
    }


} satisfies Record<string, SxProps>


const HeaderMobile: React.FC = () => {

    const router = useRouter()
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false)
    const [openSearchDrawer, setOpenSearchDrawer] = useState(false)

    if (typeof window !== "undefined") { // to prevent errors in server side rendering

        const body = document.body
        if (openSearchDrawer || openMenuDrawer) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = "scroll"
        }
    }


    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }


    return (
        <Grid container item xs={12} py={".5rem"}>

            <BackDrop onOpen={setOpenMenuDrawer} open={openMenuDrawer}/>
            <MenuDrawer open={openMenuDrawer} onOpen={setOpenMenuDrawer}/>
            <BackDrop onOpen={setOpenSearchDrawer} open={openSearchDrawer}/>
            <SearchDrawer onOpen={setOpenSearchDrawer} open={openSearchDrawer}/>

            <Grid container item xs alignItems={"center"} gap={5}>
                <IconButton onClick={() => setOpenMenuDrawer(!openMenuDrawer)} color={"primary"}
                            sx={styles.headerButton}
                            aria-label="open menu drawer">
                    <Hamburger sx={styles.headerIcon}/>
                </IconButton>
                <Typography component={Link} href={"/"} className={"pointer"} variant={"caption"} position={"relative"}
                            top={3}
                            fontFamily={"dana-black"}
                            color={"primary"} fontSize={25}>
                    Diwall
                </Typography>
            </Grid>


            <Grid container item xs={"auto"} gap={10}>
                <IconButton color={"primary"} onClick={() => setOpenSearchDrawer(!openSearchDrawer)}
                            sx={styles.headerButton}
                            aria-label="open search drawer">
                    <Search sx={styles.headerIcon} />
                </IconButton>

                {
                    user.username === null ?
                        <IconButton component={Link} href={"/auth"} color={"primary"} aria-label="login"
                                    sx={styles.headerButton}>
                            <Login sx={styles.headerIcon}/>
                        </IconButton> :
                        <>
                            <IconButton aria-label="open user menu" color={"primary"} sx={styles.headerButton}
                                        onClick={(e) => {
                                            setAnchorEl(anchorEl ? null : e.currentTarget)
                                        }}>
                                <Person sx={styles.headerIcon}/>
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
                                        <Person sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15}>
                                        حساب کاربری
                                    </Typography>

                                </MenuItem>
                                <MenuItem onClick={() => router.push(`/account/${user?._id}?tab=1`)}>
                                    <ListItemIcon>
                                        <Favorite sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15}>
                                        علاقمندی ها
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => router.push(`/account/${user?._id}?tab=2`)}>
                                    <ListItemIcon>
                                        <ShoppingBag sx={{fontSize: 25}} color={"primary"}/>
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
                                        <Logout sx={{fontSize: 25}} color={"primary"}/>
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