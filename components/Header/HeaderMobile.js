import {Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {Login, Logout, Person, Search , Menu as Humburger} from "@mui/icons-material";
import {Fragment, useContext, useState} from "react";
import {useRouter} from "next/router";
import authContext from "../../context/auth-context";
import Link from "next/link";
import Image from "next/image";


const styles = {
    header: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // zIndex: 50,
        justifyContent: "space-between",
    },
    headerIcon: {
        fontSize: {xs: 35, md: 50},
        ml: -10,

    }
}


const HeaderMobile = () => {

    const router = useRouter()
    const authCtx = useContext(authContext)


    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    return (
        <Grid container item xs={12} sx={styles.header}>

            <Grid container item xs={7} alignItems={"center"} spacing={10}>
                <Grid container item xs={"auto"}>

                <IconButton color={"primary"} sx={{mr:-10}}>
                    <Humburger sx={styles.headerIcon}/>
                </IconButton>
                </Grid>

                {/*<Link href={"/"}>*/}
                {/*    <a>*/}
                {/*        <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={40}*/}
                {/*               height={40}/>*/}
                {/*    </a>*/}
                {/*</Link>*/}
            <Grid container item xs={"auto"} position={"relative"} top={3}>
                <Link href={"/"} passHref>
                    <Typography variant={"caption"} fontFamily={"dana-black"} color={"primary"} fontSize={25}>
                        Dival
                    </Typography>
                </Link>
            </Grid>
            </Grid>


            <Grid container item xs={5} justifyContent={"flex-end"}>
                <IconButton color={"primary"} onClick={(e) => {
                    setAnchorEl(anchorEl ? null : e.currentTarget)
                }}>
                    <Search sx={styles.headerIcon}/>
                </IconButton>
                {
                    !authCtx.isAuthenticated ?

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
    )

}

export default HeaderMobile