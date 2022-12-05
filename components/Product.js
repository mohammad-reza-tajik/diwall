import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery"
import Image from "next/image"
import {Favorite} from "@mui/icons-material";
import {useRouter} from "next/router";
import React, {useState} from "react";
import axios from "axios";
import {useTheme} from "@mui/material/styles"
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../store";


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

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"))

    const [isLoading, setIsLoading] = useState(false)

    const user = useSelector(state => state)
    const dispatch = useDispatch()

    const isFavorite = user?.favoriteList.includes(props._id)



    const clickHandler = async () => {
        await router.push({
                pathname: `/products/${props._id}`,

            }
        )

    }

    const addToFavoritesHandler = () => {
        if (user?.username) {
            setIsLoading(true)
            if (isFavorite){
                axios.put("/api/remove-from-favorites", {
                    productId: props._id,
                    userId: user.userId,
                    token: user.token
                }).then( _ => {
                        setIsLoading(false)
                        dispatch(userActions.removeFromFavorites(props._id))
                    }
                ).catch(e => console.log(e))

            }
            else {

                axios.put("/api/add-to-favorites", {
                    productId: props._id,
                    userId: user.userId,
                    token: user.token
                }).then( _ => {
                        setIsLoading(false)
                        dispatch(userActions.addToFavorites(props._id))
                    }
                ).catch(e => console.log(e))
            }
        } else {

            router.push("/sign-in")
        }

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
            </Grid>
        </Grid>
    )
}

export default React.memo(Product)