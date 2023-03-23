import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery"
import Image from "next/legacy/image"
import {Favorite} from "@mui/icons-material";
import {useRouter} from "next/router";
import React, {useState} from "react";
import axios from "axios";
import {useTheme} from "@mui/material/styles"
import {userActions , useAppSelector , useAppDispatch} from "../../store";


const styles = {
    product: {
        borderRadius: 2,
        justifyContent:"center",
        p: 10,
        bgcolor: "#fff",

    },
    addToFavoritesButton: {
        position: "absolute",
        left: {xs:1,sm:3},
        top: {xs:1,sm:3},
        zIndex: 20,

    }
}


interface Product {
    _id:string;
    title:string;
    price:string


}

const Product : React.FC<Product> = (props) => {
    const router = useRouter()

    const theme = useTheme()
    const matchesMD : boolean = useMediaQuery(theme.breakpoints.down("md"))
    const matchesSM : boolean = useMediaQuery(theme.breakpoints.down("sm"))

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const user = useAppSelector(state =>state)
    const dispatch = useAppDispatch()

    const isFavorite = user?.favoriteList.includes(props._id)

    const { title } = props
    const slug = title.split(" ").join("_");



    const clickHandler = async () => {
        await router.push({
                pathname: `/products/${slug}`,

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
            <Grid item xs={12} sx={{borderRadius:2,position:"relative",overflow:"hidden",cursor:"pointer"}}>
                <Grid item sx={styles.addToFavoritesButton}>
                    <IconButton onClick={addToFavoritesHandler} aria-label="add to wishlist">
                        {isLoading ? <CircularProgress size={matchesMD ? matchesSM ? 30 : 40 : 40} sx={{
                            borderRadius: 20,
                            p: {xs:4,md:5,},
                            bgcolor: "rgba(50,50,50,0.3)",
                            color: "#fff"
                        }}/> : isFavorite ? <Favorite sx={{
                            fontSize:{xs:30,sm:40},
                                borderRadius: 20,
                                p: {xs:4,md:5,},
                                bgcolor: "rgba(50,50,50,0.3)",
                                color: "primary.main"
                            }}/> :
                            <Favorite sx={{
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
                       className={"pointer"} />
            </Grid>
            <Grid container item height={50} alignItems={"center"} xs={12}>
                <Grid item xs={12} onClick={clickHandler}>
                    <Typography variant={"h4"} component={"span"} fontSize={{xs: 11, md :14,lg:15}} fontFamily={"dana-bold"}
                                className={"pointer"} lineHeight={1.5}>{props.title}</Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} height={50}>
                <Grid item xs={12}>
                    <Typography variant={"h4"} component={"span"} fontFamily={"dana-medium"} color={"#069f69"}
                                sx={{fontSize: {xs: 11, md :14,lg:15}}}>
                        {props.price}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default React.memo(Product)