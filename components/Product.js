import {Box, Grid, IconButton, Typography} from "@mui/material";
import Image from "next/image"
import {ShoppingBagOutlined} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useContext} from "react";
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

    }
}


const Product = (props) => {
    const router = useRouter()
    const authCtx = useContext(authContext)
    const {isLoading ,setIsLoading} = useContext(loadingContext)


    const clickHandler = async () => {
        await router.push({
            pathname:`/products/${props.title}`,

        }

        )

    }

    const addToCartHandler = () => {
        if (authCtx.isAuthenticated){
            // authCtx.addToCart(props._id)
            axios.put("/api/add-to-cart",{productId : props._id , userId: authCtx.user.userId, token: authCtx.user.token}).then(res => {
                    console.log("added successfully")
                authCtx.login(res)
                    // console.log(res)
                }

            ).catch(e => console.log(e))
        }
        else
            router.push("/sign-in")

        // console.log(authCtx.user.cart)


    }


    return (
        <Grid container item direction={"column"} sx={styles.product} xs={"auto"}>

            <Grid item xs={11}  borderRadius={2} overflow={"hidden"} onClick={clickHandler} cursor={"pointer"}>

                <Image src={props.image} alt={"product"} width={400} height={400} className={"pointer"}/>
            </Grid>
            <Grid container item height={50} alignItems={"center"}>
                <Grid item xs onClick={clickHandler}>
                    <Typography variant={"h4"} fontSize={16} fontFamily={"dana-demibold"} className={"pointer"}>{props.title}</Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent={"center"} alignItems={"center"} height={50}>
                <Grid item xs={9}>
                    <Typography variant={"h4"} fontSize={16} fontFamily={"dana-demibold"} color={"#069f69"}>
                        {props.price}
                    </Typography>
                </Grid>
                <Grid container item xs={3} justifyContent={"flex-end"}>
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
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Product