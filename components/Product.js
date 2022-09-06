import {Box, Grid, IconButton, Typography} from "@mui/material";
import Image from "next/image"
import {Favorite, HeartBroken, ShoppingBagOutlined} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useContext, useState} from "react";
import loadingContext from "../store/loading-context";
import axios from "axios";
import authContext from "../store/auth-context";



const styles = {
    product: {
        boxShadow: "-3px 3px 5px rgba(20,20,20,.2) , 3px -3px 5px rgba(20,20,20,.2) ",
        borderRadius: 2,
        p:10,
        bgcolor:"#fff"
        // gap:10

    },
    addToFavoritesButton:{
        position:"absolute",
        left:3,
        top:3,
        zIndex:20,

    }
}


const Product = (props) => {
    const router = useRouter()
    const authCtx = useContext(authContext)
    const [heartIsVisible,setHeartIsVisible] = useState(false)
    // const {isLoading ,setIsLoading} = useContext(loadingContext)


    const clickHandler = async () => {
        await router.push({
            pathname:`/products/${props.title}`,

        }

        )

    }

    /*const addToCartHandler = () => {
        if (authCtx.isAuthenticated){
            // authCtx.addToCart(props._id)
            axios.put("/api/add-to-cart",{productId : props._id , userId: authCtx.user.userId, token: authCtx.user.token}).then(res => {
                    console.log("added successfully")
                authCtx.login(res.data.user)
                    // console.log(res)
                }

            ).catch(e => console.log(e))
        }
        else
            router.push("/sign-in")

        // console.log(authCtx.user.cart)


    }*/
    const addToFavorites = () => {
        if (authCtx.isAuthenticated){
            // authCtx.addToCart(props._id)
            axios.put("/api/add-to-favorites",{productId : props._id , userId: authCtx.user.userId, token: authCtx.user.token}).then(res => {
                    console.log("added successfully")
                    authCtx.login(res.data.user)
                    // console.log(res)
                }

            ).catch(e => console.log(e))
        }
        else
            router.push("/sign-in")

    }


    return (
        <Grid container item direction={"column"} sx={styles.product} xs={"auto"}>

            <Grid item xs={11}  borderRadius={2} position={"relative"} overflow={"hidden"}
                  onMouseEnter={()=> setHeartIsVisible(true)}
                  onMouseLeave={()=>setHeartIsVisible(false)}
                   cursor={"pointer"}>
                <Grid item sx={{...styles.addToFavoritesButton ,opacity:heartIsVisible ? 1 : 0  }}>
                    <IconButton onClick={addToFavorites}>
                        <Favorite sx={{fontSize:50,borderRadius:20,p:8,bgcolor:"rgba(50,50,50,0.3)",color:"#fff"}} />
                    </IconButton>
                </Grid>

                <Image src={props.image}  onClick={clickHandler} alt={"product"} width={400} height={400} className={"pointer"}/>
            </Grid>
            <Grid container item height={50} alignItems={"center"}>
                <Grid item xs onClick={clickHandler}>
                    <Typography variant={"h4"} fontSize={16} fontFamily={"dana-demibold"} className={"pointer"}>{props.title}</Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} height={50}>
                <Grid item xs={12}>
                    <Typography variant={"h4"} fontSize={16} fontFamily={"dana-demibold"} color={"#069f69"}>
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

export default Product