import {
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    SwipeableDrawer,
    InputAdornment,
    TextField,
    Tooltip,
    Icon,
    Box,
    Stack,
    ListItemText,
    ListItemButton,
    ListItem,
    List,
    Divider,
    useTheme, useMediaQuery
} from "@mui/material";
import {
    Close,
    Favorite,
    Login,
    Logout,
    Menu as Hamburger,
    Person,
    Search,
    ShoppingBag
} from "@mui/icons-material";
import {Fragment, useContext, useRef, useState} from "react";
import {useRouter} from "next/router";
import authContext from "../../context/auth-context";
import Link from "next/link";
import Image from "next/image"
import axios from "axios";


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
            width: {xs:1,sm:.6,md:.6},
            height: 1,
            fontSize: {xs: 4, sm: "2rem"},
            bgcolor:"#fff",
            // borderRadius: 30,


        },
        searchIcon: {
            fontSize: 25,
            color: "primary.main",


        },
        closeIcon: {
            color: "white.main",
            fontSize: 35,
            // backgroundColor:"rgba(0,0,0,.2)",
            bgcolor: "primary.main",
            borderRadius:20,

            // position:"absolute",
            // left:10,
            // top:10,



        },
    backDrop:{
        // height: "100vh",
        justifyContent:"center",
        alignItems:"center",
        width: "100vw",
        // bgcolor: "primary.main",
        px:20,
        overflow: "hidden"
        // backgroundImage:"linear-gradient(rgb(6, 159, 105),rgb(6, 159, 105))"
    }







}


const HeaderMobile = () => {

    const router = useRouter()
    const authCtx = useContext(authContext)

    const searchRef = useRef()

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    // const matchesXS = useMediaQuery(index.breakpoints.down("xs"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))
    // const headerRef= useRef()

    const [isWrong, setIsWrong] = useState(false)

    const [openMenuDrawer,setOpenMenuDrawer] = useState(false)
    const [openSearchDrawer,setOpenSearchDrawer] = useState(false)

    const iOS =typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    //*** menu logic ***//

    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)
    const closeMenu = () => {
        setAnchorEl(null);
    }

    const submitSearchHandler = async (e) => {
        // e.preventDefault()

        if (searchRef.current?.value.trim() === "") {
            setIsWrong(true)
            return
        }
        setIsWrong(false)
        console.log(searchRef.current.value)
        axios.post(`/api/products`, {search:searchRef.current.value}).then(res => {
            router.push(
                {
                    pathname: `/products`,
                    query: {
                        search:searchRef.current.value,
                        page: 1
                    }

                })
            searchRef.current.value = ""
            setOpenSearchDrawer(false)
        }).catch(err => {
            console.log(err)

        })


    }



    return (
        <Grid container item xs={12}>

            <Grid container item xs={7} alignItems={"center"} spacing={10}>
                <Grid container item xs={"auto"}>

                    <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}

                                     // the following props is for fixing drawer in rtl languages

                                     anchor={"left"} PaperProps={{
                        sx: {
                            left: 'unset !important',
                            right: '0 !important'
                        }
                    }} open={openMenuDrawer} onOpen={()=>setOpenMenuDrawer(true)} onClose={()=> setOpenMenuDrawer(false)}>
                        <Grid container item xs={12} width={matchesSM ? "75vw" : "50vw"} p={20} >




                            <List sx={{width:1}}>
                                <ListItem sx={{mb:20,justifyContent:"center"}}>
                                <ListItemIcon sx={{ fontSize: 20 }} onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/"} passHref>
                                        <a>
                                            <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={80}
                                                   height={80}/>
                                        </a>
                                    </Link>
                                </ListItemIcon>
                                </ListItem>

                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            صفحه نخست
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/products"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            جدیدترین محصولات
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/products?sortBy=2"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            پرفروش ترین محصولات
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/products?sortBy=3"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            محبوب ترین محصولات
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>
                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/about"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            درباره ما
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <Divider sx={{width: 1, bgcolor: "#ddd"}}/>

                                <ListItem onClick={()=>setOpenMenuDrawer(false)}>
                                    <Link href={"/collaboration"} passHref>
                                        <Typography variant={"subtitle1"} fontSize={14}>
                                            همکاری با ما
                                        </Typography>
                                    </Link>
                                </ListItem>

                            </List>




                                {/*/!*<Link href={"/products"}><Box component={"a"} sx={styles.main_nav_link}>همه محصولات</Box></Link>*!/*/}
                                {/*<Link href={"/products"}><Box component={"a"} sx={styles.main_nav_link}>جدیدترین ها</Box></Link>*/}
                                {/*<Link href={"/products?sortBy=2"}><Box component={"a"} sx={styles.main_nav_link}>پرفروش ترین ها</Box></Link>*/}
                                {/*<Link href={"/products?sortBy=3"}><Box component={"a"} sx={styles.main_nav_link}>محبوب ترین ها</Box></Link>*/}
                                {/*<Link href={"/about"}><Box component={"a"} sx={styles.main_nav_link}>درباره ما</Box></Link>*/}
                                {/*<Link href={"/collaboration"}><Box component={"a"} sx={styles.main_nav_link}>همکاری با ما</Box></Link>*/}


                        </Grid>
                    </SwipeableDrawer>
                    <IconButton onClick={()=>setOpenMenuDrawer(!openMenuDrawer)} color={"primary"} sx={{mr: -10}}>
                        <Hamburger sx={styles.headerIcon}/>
                    </IconButton>
                </Grid>

                <Grid container item xs={"auto"} position={"relative"} top={3}>
                    <Link href={"/"} passHref>
                        <Typography className={"pointer"} variant={"caption"} fontFamily={"dana-black"} color={"primary"} fontSize={25}>
                            Dival
                        </Typography>
                    </Link>
                </Grid>
            </Grid>


            <Grid container item xs={5} justifyContent={"flex-end"}>
                <IconButton color={"primary"} onClick={()=>setOpenSearchDrawer(!openSearchDrawer)}>
                    <Search sx={styles.headerIcon}/>
                </IconButton>
                <SwipeableDrawer anchor={"top"} open={openSearchDrawer} onOpen={()=>setOpenSearchDrawer(true)} onClose={()=> setOpenSearchDrawer(false)}>
                    <Grid container height={100} item spacing={10}  sx={styles.backDrop}>
                        <Grid item xs>
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
                                        <IconButton onClick={submitSearchHandler}>
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
                            <IconButton onClick={()=>setOpenSearchDrawer(false)}>
                                <Close sx={styles.closeIcon} />
                            </IconButton>

                        </Grid>


                    </Grid>
                </SwipeableDrawer>
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
                                <MenuItem onClick={() => router.push("/profile/" + authCtx.user?.userId + "?tab=2")}>
                                    <ListItemIcon>
                                        <Favorite sx={{fontSize: 25}} color={"primary"}/>
                                    </ListItemIcon>
                                    <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                        علاقمندی ها
                                    </Typography>
                                </MenuItem>
                                    <MenuItem
                                        onClick={() => router.push("/profile/" + authCtx.user?.userId + "?tab=3")}>
                                        <ListItemIcon>
                                            <ShoppingBag sx={{fontSize: 25}} color={"primary"}/>
                                        </ListItemIcon>
                                        <Typography variant={"caption"} fontSize={15} fontFamily={"dana-medium"}>
                                            سبد خرید
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