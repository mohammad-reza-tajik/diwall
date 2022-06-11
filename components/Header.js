import MainNavigation from "./MainNavigation";
import {Button, Grid, IconButton, InputAdornment, TextField, useMediaQuery, useTheme} from "@mui/material";
import {FavoriteBorder, FavoriteOutlined, Login, Search, ShoppingBagOutlined} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

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
        fontSize: "2.5rem",
        color: "primary.main"
    },
    signInButton: {

        width: "20rem",
        height: "4rem",
        borderRadius: 2,
        fontFamily:"dana-demibold",
        mr: "auto",
        fontSize: "1.4rem",
        gap: 10,
        color: "white",
        "&> *": {
            color: "white"
        }

    }
}

const Header = () => {

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    return (
        <Grid container item direction={"row"} component={"header"} justifyContent={"center"}>

            <Grid container item direction={"row"} alignItems={"center"} xs={11}
                  justifySelf={"center"} pt={20}>
                <Grid container item xs={1} minWidth={90} minHeight={90}>
                    <Link href={"/"}>
                        <a>
                            <Image src={"/assets/pictures/logo3.png"} alt={"dival-logo"} width={90} height={90}/>
                        </a>
                    </Link>
                </Grid>
                <Grid item xs={7}>
                    <Grid container item xs justifyContent={"center"} alignItems={"center"}>
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
                <Grid container item xs={1} justifyContent={"flex-end"}>
                    <IconButton color={"primary"}>
                        <FavoriteBorder sx={{
                            fontSize: {xs: 40, sm: 50},
                            border: "2px solid #11AE77",
                            borderRadius: "50px",
                            p: ".7rem"
                        }}/>
                    </IconButton>
                </Grid>
                <Grid container item xs={1} justifyContent={"flex-start"}>
                    <IconButton color={"primary"}>
                        <ShoppingBagOutlined sx={{
                            fontSize: {xs: 40, sm: 50},
                            border: "2px solid #11AE77",
                            borderRadius: "50px",
                            p: ".7rem"
                        }}/>
                    </IconButton>
                </Grid>
                <Grid item container xs={2} justifyContent={"flex-end"}>
                    {!matchesMD && <Link href={"/sign-in"} passHref><Button
                        variant={"contained"}
                        color={"primary"}
                        startIcon={<Login sx={{fontSize: 10, ml: 5,transform:"rotateZ(180deg)"}}/>
                        }
                        sx={styles.signInButton}
                    >
                        ورود / ثبت نام
                    </Button>
                    </Link>}
                    {matchesMD &&
                        <Link href={"/sign-in"} passHref>
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
            <MainNavigation/>
        </Grid>

    )

}

export default Header