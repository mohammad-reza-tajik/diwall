import {CircularProgress, Grid, IconButton, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image"
import {Favorite} from "@mui/icons-material";
import {useRouter} from "next/router";
import React, {useContext, useState} from "react";
import axios from "axios";
import authContext from "../context/auth-context";


const styles = {
    product: {
        boxShadow: "2px 2px 2px rgba(20,20,20,.2) ",
        borderRadius: 2,
        justifyContent:"center",
        p: 10,
        bgcolor: "#fff"
        // gap:10

    },
    addToFavoritesButton: {
        position: "absolute",
        left: {xs:1,sm:3},
        top: {xs:1,sm:3},
        zIndex: 20,

    }
}


const Product = (props) => {
    const router = useRouter()
    // console.log(props)
    const authCtx = useContext(authContext)
    const isFavorite = authCtx.user?.favoriteList.includes(props._id)
    // const [heartIsVisible, setHeartIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [image, setImage] = useState("/assets/pictures/product_placeholder.png")

    // const [isFavorite,setIsFavorite] = useState(false)
    // const {isLoading ,setIsLoading} = useContext(loadingContext)

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))
    // const matchesXS = useMediaQuery(index.breakpoints.down("xs"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))


    // if image is not loaded use the placeholder
    // useEffect(() => {
        // if (props.image) {
            // setImage(props.image)
        // }
    // }, [props.image])


    const clickHandler = async () => {
        await router.push({
                pathname: `/products/${props._id}`,

            }
        )

    }

    const addToFavoritesHandler = () => {
        if (authCtx.isAuthenticated) {
            setIsLoading(true)
            if (isFavorite) {
                // console.log(authCtx.user)
                authCtx.login({
                    ...authCtx.user,
                    favoriteList: authCtx.user.favoriteList.filter((element) => element != props._id)
                })
            }
            // authCtx.addToCart(props._id)
            axios.put("/api/add-to-favorites", {
                productId: props._id,
                userId: authCtx.user.userId,
                token: authCtx.user.token
            }).then(res => {
                    // console.log("added successfully")
                    // setIsFavorite(true)
                    authCtx.login(res.data.user)
                    // console.log(res)
                    setIsLoading(false)
                }
            ).catch(e => console.log(e))
        } else
            router.push("/sign-in")

    }


    return (
        <Grid container item sx={styles.product} xs={12}>

            <Grid item xs={12} borderRadius={2} position={"relative"} overflow={"hidden"}
                  cursor={"pointer"}>
                <Grid item sx={styles.addToFavoritesButton}>
                    <IconButton onClick={addToFavoritesHandler}>
                        {isLoading ? <CircularProgress size={matchesMD ? matchesSM ? 30 : 40 : 40} sx={{
                            borderRadius: 20,
                            p: {xs:4,md:5,},
                            bgcolor: "rgba(50,50,50,0.3)",
                            color: "#fff"
                        }}/> : isFavorite ? <Favorite size={100} sx={{
                            fontSize:{xs:30,sm:40},
                                borderRadius: 20,
                                p: {xs:4,md:5,},
                                bgcolor: "rgba(50,50,50,0.3)",
                                color: "primary.main"
                            }}/> :
                            <Favorite size={100} sx={{
                                fontSize:{xs:30,sm:40,},
                                borderRadius: 20,
                                p: {xs:4,md:5,},
                                bgcolor: "rgba(50,50,50,0.3)",
                                color: "#fff"
                            }}/>
                        }
                    </IconButton>
                </Grid>

                <Image src={`/assets/pictures/products/${props.title ?.replaceAll(" ","-")}.jpg`} onClick={clickHandler} alt={`${props.title}`} width={400} height={400}
                       className={"pointer"}/>
            </Grid>
            <Grid container item height={50} alignItems={"center"} xs={12}>
                <Grid item xs={12} onClick={clickHandler}>
                    <Typography variant={"h4"} fontSize={{xs: 12, md :14,lg:16}} fontFamily={"dana-bold"}
                                className={"pointer"} lineHeight={1.5}>{props.title}</Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} height={50}>
                <Grid item xs={12}>
                    <Typography variant={"h4"} fontFamily={"dana-bold"} color={"#069f69"}
                                sx={{fontSize: {xs: 12, md :14,lg:16}}}>
                        {props.price}
                    </Typography>
                </Grid>
                {/* <Grid container item xs={3} justifyContent={"flex-end"}>
                    <IconButton onClick={addToCartHandler}>
                        <ShoppingBagOutlined color={"primary"}
                                             sx={
                                                 {
                                                     fontSize: {xs: 35, sm: 40},
                                                     border: "2px solid #11AE77",
                                                     borderRadius: "50px",
                                                     p: ".4rem"
                                                 }
                                             }/>
                    </IconButton>
                </Grid>*/}
            </Grid>
        </Grid>
    )
}

export default React.memo(Product)