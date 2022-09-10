import {Grid, IconButton, ListItem, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {AddCircleOutline, Delete, RemoveCircleOutline} from "@mui/icons-material";
import {useContext, useState} from "react";
import authContext from "../store/auth-context";
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
                    console.log(res)
                    authCtx.login(res.data.user)
                    // setCart(res.data.user.cart)

                })
            }

        }




    return (
        <ListItem divider sx={styles.listItem} key={props._id}>
            <Grid container item xs={12}>
                <Grid sx={{cursor:"pointer"}} container item xs={6} alignItems={"center"} gap={20} onClick={()=>router.push("/products/" + props._id.toString() )}>

                    <Image src={props.image} width={90} height={90} alt={props.title}/>
                    <Typography variant={"h4"} fontSize={18} color={"#666"}>
                        {props.title}
                    </Typography>
                </Grid>
                <Grid container item xs={6} alignItems={"center"} gap={5} justifyContent={"flex-end"}>

                    <IconButton onClick={()=>{setNumberInCart((prevState)=> prevState+1)}}>
                        <AddCircleOutline color={"primary"} sx={{fontSize: 30}} />
                    </IconButton>
                    <TextField onChange={numbersInCartChangeHandler} value={numberInCart} sx={{width:80}} color={"primary"} size={"small"} variant={"outlined"} />

                    {numberInCart != 1 ?
                        <IconButton onClick={()=>{setNumberInCart((prevState)=> prevState-1)}}>
                            <RemoveCircleOutline color={"primary"} sx={{fontSize: 30}} />
                        </IconButton> :

                        <IconButton onClick={removeFromCart}>
                            <Delete color={"primary"} sx={{fontSize: 30}} />
                        </IconButton>

                    }

                </Grid>
            </Grid>
        </ListItem>
    )

}

export default CartItem