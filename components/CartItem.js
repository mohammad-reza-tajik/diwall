import {Avatar, Grid, IconButton, ListItem, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import Image from "next/image";
import {AddCircleOutline, Delete, RemoveCircleOutline} from "@mui/icons-material";
import {useContext, useState} from "react";
import authContext from "../context/auth-context";
import axios from "axios";
import {useRouter} from "next/router";


const styles = {
    tab: {
        fontSize: 16, color: "#333", fontFamily: "dana-demibold", my: 10, // bgcolor:"primary"
    },
    list: {
        width: 1,
        height: "auto",
        // maxHeight:400,

    }
}

const CartItem = (props) => {

    const authCtx = useContext(authContext)
    const router = useRouter()
    // console.log(authCtx)
    const [numberInCart,setNumberInCart] = useState(1)
    const numbersInCartChangeHandler = (e) => {
        setNumberInCart(e.target.value)

    }

    const removeFromCart = () => {
            if (authCtx.isAuthenticated) {

                axios.put("/api/remove-from-cart", {
                    userId: authCtx.user?.userId, token: authCtx.user?.token,productId : props._id
                }).then(res => {
                    // console.log(res)
                    authCtx.login(res.data.user)
                    // setCart(res.data.user.cart)

                })
            }

        }

    const theme = useTheme()
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"))
    const matchesLG = useMediaQuery(theme.breakpoints.down("lg"))




    return (
        <Grid  pb={10} borderBottom={"1px solid rgba(33,33,33,.1)"} container item xs={12} justifyContent={"flex-start"} alignItems={"flex-start"} key={props._id}>
            <Grid container item xs={12}>
                <Grid className={"pointer"} container item xs={12} md={true} lg={6} alignItems={"center"} gap={matchesMD? 10 : 20} onClick={()=>router.push("/products/" + props._id.toString() )}>
                    <Grid item xs={"auto"}>
                        <Avatar src={props.image} width={matchesLG ? 50 :90} height={matchesLG? 50 : 90} alt={props.title}/>
                    </Grid>
                    <Grid item xs>
                    <Typography variant={"h4"} fontSize={{xs:14,lg:18}} color={"#666"}>
                        {props.title}
                    </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={"auto"} lg={6} alignItems={"center"} gap={-20} justifyContent={"flex-end"}>

                    <IconButton onClick={()=>{setNumberInCart((prevState)=> +prevState+1)}}>
                        <AddCircleOutline color={"primary"} sx={{fontSize: {xs:20,md:30}}} />
                    </IconButton>
                    <TextField  onChange={numbersInCartChangeHandler} value={numberInCart} sx={{width: {xs:40,md:80}}} color={"primary"} type={"number"} size={"small"} variant={"standard"} />

                    {numberInCart != 1 ?
                        <IconButton onClick={()=>{setNumberInCart((prevState)=> +prevState-1)}}>
                            <RemoveCircleOutline color={"primary"} sx={{fontSize: {xs:20,md:30}}} />
                        </IconButton> :

                        <IconButton onClick={removeFromCart}>
                            <Delete color={"primary"} sx={{fontSize: {xs:20,md:30}}} />
                        </IconButton>

                    }

                </Grid>
            </Grid>
        </Grid>
    )

}

export default CartItem