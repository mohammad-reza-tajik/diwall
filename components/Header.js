import MainNavigation from "./MainNavigation";
import {Grid, IconButton,Button, InputAdornment, TextField, useMediaQuery, useTheme} from "@mui/material";
import {Search, ShoppingBagOutlined,Login} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

// import Hero from "./Hero";

const styles = {
    searchField: {
        width: {xs: .8, md: 400},
        height: 1,
        fontSize: {xs: 4, sm: "2rem"},
        '& .MuiInput-input': {
            borderRadius: 30

        },
        "& .MuiInput-inputMultiline": {
            borderRadius: 30

        }

    },
    searchIcon: {
        fontSize: "2rem",
        color: "primary.main"
    },
    signupButton: {

        width: "20rem",
        height: "4rem",
        borderRadius: 2,
        mr: "auto",
        fontSize: "1.4rem",
        gap: 10,
        color:"white",
        "&> *" : {
            color:"white"
        }

    }
}

const Header = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Grid container direction={"column"} component={"header"}>
            <Grid container item direction={"row"} justifyContent={"center"}>

                <Grid container item direction={"row"}  alignItems={"center"} xs={11}
                      justifySelf={"center"}>
                    <Grid item xs={1} minWidth={140} minHeight={140}>
                        <Link href={"/"}>
                            <a>
                                <Image src={"/assets/pictures/logo.png"} alt={"dival-logo"} width={140} height={140}/>
                            </a>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container item xs justifyContent={"flex-start"} mr={10} alignItems={"center"}>
                            <TextField
                                placeholder={"جستجو ..."}
                                sx={styles.searchField}
                                variant="outlined"
                                size={matchesSM ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton><Search sx={styles.searchIcon}/></IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} justifyContent={"flex-end"}>
                        <IconButton color={"primary"}>
                            <ShoppingBagOutlined sx={{fontSize: {xs: 40, sm: 50},border:"2px solid #11AE77",borderRadius:"50px",p:".7rem"}}/>
                        </IconButton>
                    </Grid>
                    <Grid item container xs={2} justifyContent={"flex-end"}>
                        {!matchesMD && <Link href={"/signup"} passHref><Button
                            variant={"contained"}
                            color={"primary"}
                            startIcon={<Login sx={{fontSize: 10, ml: 5, transform: "rotate(180deg)",}}/>
                            }
                            sx={styles.signupButton}
                        >
                            ورود / ثبت نام

                        </Button>
                        </Link>}
                        {matchesMD &&
                            <Link href={"signup"} passHref>
                                <IconButton>
                                    <Login sx={{
                                        color: "white",
                                        fontSize: {xs: 30, sm: 40},
                                        transform: "rotate(180deg)"
                                    }}/>
                                </IconButton>
                            </Link>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <MainNavigation/>
            </Grid>
            <Grid item>
                {/*<Hero />*/}
            </Grid>
        </Grid>

    )

}

export default Header